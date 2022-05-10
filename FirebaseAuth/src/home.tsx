import { View, Text, StyleSheet, Pressable} from "react-native";
import { signOut } from "firebase/auth";
import {auth} from '../firebase';


const Home = (): JSX.Element => {

const authSignoutUser = () => async () => {
  await   auth.signOut();
};
  return (
  <View style={s.container}>
  <Text style={s.text}>You are logged IN</Text>
  <Pressable onPress={authSignoutUser}>
    <Text style={s.text}>Exit</Text>
  </Pressable>
</View>
)
}


export default Home;

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
  }
})