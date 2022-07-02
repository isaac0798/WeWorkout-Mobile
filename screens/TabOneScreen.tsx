import React from "react";
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import AppLoading from 'expo-app-loading';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const login = async () => {
    try {
        const response = await fetch("http://192.168.1.152:8080/login", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            unverifiedPassword: password,
            email: email
          })
        });

        const json = await response.json();
        setTokenKey(json);

        const whoamiResponse = await fetch("http://192.168.1.152:8080/whoami", {
            method: "POST",
            headers: {
                "Authorization": tokenKey
            }
        });

        const user = await whoamiResponse.json();
        setUsername(user);
        console.log(username);

    } catch (error) {
        console.log(error);
        return;
    }

    setLoggedIn(true);
  }

  const logout = () => {
    alert("bye");
    setLoggedIn(false);
  }

  let [fontsLoaded] = useFonts({Comfortaa_400Regular});

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tokenKey, setTokenKey] = React.useState("");
  const [username, setUsername] = React.useState("");

  return (
    <View style={styles.container}>
        <Text style={{
            fontFamily: 'Comfortaa_400Regular',
            fontSize: 36,
            alignSelf: 'baseline',
            left: '10%'
        }}>Log in</Text>
        <TextInput
            style={{
                height: 40,
                width: '80%',
                backgroundColor: 'white',
                color: 'black'
            }}
            onChangeText={setEmail}
            placeholder="email"
            value={email}/>
        <TextInput
            style={{
                height: 40,
                width: '80%',
                backgroundColor: 'white',
                color: 'black'
            }}
            onChangeText={setPassword}
            placeholder="password"
            value={password} />
        {loggedIn ?
        <TouchableOpacity
            onPress={logout}
            style={{
                width: '80%',
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFD60A',
            }}>
            <Text style={{
                color: '#000814'
            }}>Logout</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity
            onPress={login}
            style={{
                width: '80%',
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFD60A',
            }}>
            <Text style={{
                color: '#000814'
            }}>Login</Text>
        </TouchableOpacity>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000814',
    justifyContent: 'center'
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
