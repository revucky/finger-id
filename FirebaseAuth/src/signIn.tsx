import { View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import {useState, useEffect, useRef} from 'react';
import {emailKey, pinKey, pinReg} from './constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import * as LocalAuthentication from 'expo-local-authentication'


const SignIn = ({navigation}: any): JSX.Element => {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState<string>('');
  const CODE_LENGTH: number = 6;

const _focus = () => inputRef.current?.focus && inputRef.current.focus();

useEffect(() => {
const getEnrollment = async () =>{
const isEnrolled = await LocalAuthentication.isEnrolledAsync();
if(isEnrolled) {
  const {success} = await LocalAuthentication.authenticateAsync({promptMessage: 'Authenticate'});
  if(success) verifyPin(true);
}
}
getEnrollment();
}, []);

useEffect(() => {
  if(pinReg.test(code) && code.length === CODE_LENGTH) {
    verifyPin();
  }
}, [code]);

const verifyPin = async (bypassPin = false) => {
  try {
    const values = await AsyncStorage.multiGet([emailKey, pinKey]);
    if(values[0][1] !== null && values[1][1] !== null) {
      if (bypassPin) {
        signIn(values[0][1], values[1][1]);
      }else if (values[1][1] === code) {
        signIn(values[0][1], values[1][1])
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    
  }
};

const signIn = async (email: string, pin: string) => {
await signInWithEmailAndPassword(auth, email, pin).then((userCredentials) => {
  navigation.navigate('Home');
}).catch((error) => {
  console.log(JSON.stringify(error));
})
}



return (
<View style={s.container}>
  <Text style={s.text}>Sign in with pin</Text>
    <Pressable onPress={()=> _focus()}>
      <View style={s.row}>
        {[...new Array(CODE_LENGTH).fill(null).map((_, i) => (
          <View key={i} style={{...s.pinEl, ...code && i < code.length && s.activePinEl} }/>
        )),
        ]}
        <TextInput autoFocus style={s.invisible}
        keyboardType='number-pad'
        maxLength={6}
        ref={inputRef}
        value={code}
        onChangeText={setCode}/>
        </View>
    </Pressable>
</View>)
}

export default SignIn;

const s = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontFamily: 'Federo-Regular',
    marginBottom: 15,
  },
    pinEl: {
    marginRight: 5,
    borderRadius: 10,
    width: 30,
    height: 35,
    backgroundColor: '#5aa469',
    marginBottom: 15,
  },
  activePinEl: {
    backgroundColor: '#d55d6e',
  },
  row: {
    flexDirection: 'row',
  },
  invisible: {
    width: 0,
    height: 0,
  },
})