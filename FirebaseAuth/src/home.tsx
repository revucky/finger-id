import { View, Text, StyleSheet} from "react-native";

const Home = (): JSX.Element => 

{
  return (
  <View style={s.container}>
  <Text style={s.text}>You are logged IN</Text>
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