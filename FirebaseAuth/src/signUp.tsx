import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'; 
import {useState, useEffect, useRef} from 'react';
import { emailReg, pinReg, emailKey, pinKey} from './constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';

const SignUp = ({ navigation }: any): JSX.Element =>{
const [email, setEmail] = useState<string>('');
const [isDisabled, setIsDisabled] = useState<boolean>(true);
const [secondStep, setSecondStep] = useState<boolean>(false);
const [thirdStep, setThirdStep] = useState<boolean>(false);
const inputRef = useRef<TextInput>(null);
const [code, setCode] = useState<string>('');
const [confirmCode, setConfirmCode] = useState<string>('');
const CODE_LENGTH: number = 6;

const _focus = () => inputRef.current?.focus && inputRef.current.focus();

useEffect(() => {
  if(emailReg.test(email)) {
    setIsDisabled(false);
  } else setIsDisabled(true);
}, [email]);

useEffect(() => {
  if(pinReg.test(code) && code.length === CODE_LENGTH) {
    setThirdStep(true);
  }
}, [code]);

useEffect(() => {
  if(pinReg.test(confirmCode) && confirmCode.length === CODE_LENGTH && confirmCode === code) {
    createAccount();
  }
}, [confirmCode]);

const moveNext =() => {
setSecondStep(true);
setIsDisabled(true);
};

    const createAccount = async () => {
        await createUserWithEmailAndPassword(auth, email, code).then((userCredentials) => {
            console.log(userCredentials);
            storeData();
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

    const storeData = async () => {
        await AsyncStorage.multiSet([[emailKey, email], [pinKey, code]]).then(() => {
            navigation.navigate('Home');
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

return (<View style={s.container}>
  {!secondStep? (
    <>
  <Text style={s.text}>Enter email</Text>
  <TextInput style={s.input} onChangeText={setEmail} value={email} />
  <Pressable onPress={moveNext} disabled={isDisabled} style={isDisabled ? s.disabledBtn : s.btn} >
    <Text style={s.btnText}>Go in</Text>
  </Pressable> 
  </>) : (
    <>
    <Text style={s.text}>{!thirdStep ? 'Enter Pin Code' : 'Confirm pin code'}</Text>
    <Pressable onPress={()=> _focus()}>
      <View style={s.row}>
        {[...new Array(CODE_LENGTH).fill(null).map((_, i) => (
          <View key={i} style={!thirdStep ? {...s.pinEl, ...code && i < code.length && s.activePinEl} : 
        {...s.pinEl, ...confirmCode && i < confirmCode.length && s.activePinEl}}/>
        )),
        ]}
        <TextInput autoFocus style={s.invisible}
        keyboardType='number-pad'
        maxLength={6}
        ref={inputRef}
        value={!thirdStep ? code : confirmCode}
        onChangeText={!thirdStep ? setCode : setConfirmCode}/>
        </View>
    </Pressable>
    </>
  )}
  </View>)
}

export default SignUp;

const s = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 25,
    marginBottom: 15,
    fontFamily: 'Federo-Regular',
    marginTop: 100,
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: "#f0f8ff",
    height: 45,
    borderRadius: 10,
    color: "#daa1a1f5",
    backgroundColor: "#9ee4c1ad",
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Federo-Regular',
  },
  disabledBtn: {
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    padding: 5,
    textAlign: 'center',
  },
  btn: {
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#e7812bf5',
    padding: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'Federo-Regular',
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