import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import AppLoading from 'expo-app-loading';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

const height = Dimensions.get('window').height*0.5;
const width = Dimensions.get('window').width;

export default function SignUpScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const signup = async () => {
    const d = new Date();
    try {
        const response = await fetch("http://192.168.1.152:8080/user", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            passwordhash: password,
            email: email,
            username: username,
            first_name: firstName,
            last_name: surname,
            create_date:`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
          })
        });
    } catch (error) {
        console.log(error);
        return;
    }
  }

  let [fontsLoaded] = useFonts({Comfortaa_400Regular});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
        <View style={loginContainer.container}>
            <Text style={{
                fontFamily: 'Comfortaa_400Regular',
                fontSize: 36,
                alignSelf: 'baseline',
                left: '10%'
            }}>Sign Up</Text>
            <TextInput
                style={{
                    height: 40,
                    width: '80%',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3
                }}
                onChangeText={setEmail}
                placeholder="email..."
                placeholderTextColor="grey"
                value={email}/>
            <TextInput
                style={{
                    height: 40,
                    width: '80%',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3
                }}
                onChangeText={setPassword}
                placeholder="password..."
                placeholderTextColor="grey"
                value={password} />
            <TextInput
                style={{
                    height: 40,
                    width: '80%',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3
                }}
                onChangeText={setUsername}
                placeholder="username..."
                placeholderTextColor="grey"
                value={username} />
            <TextInput
                style={{
                    height: 40,
                    width: '80%',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3
                }}
                onChangeText={setFirstname}
                placeholder="First Name..."
                placeholderTextColor="grey"
                value={firstName} />
            <TextInput
                style={{
                    height: 40,
                    width: '80%',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3
                }}
                onChangeText={setSurname}
                placeholder="Surname..."
                placeholderTextColor="grey"
                value={surname} />
            <TouchableOpacity
                onPress={signup}
                style={{
                    width: '80%',
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFD60A',
                    borderRadius: 5
                }}>
                <Text style = {{
                    color: '#001D3D'
                }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const loginContainer = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 3,
    borderColor: 'yellow'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000814',
    height: 10,
    borderWidth: 3,
    borderColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
