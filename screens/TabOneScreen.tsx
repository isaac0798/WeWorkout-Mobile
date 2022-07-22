import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import AppLoading from 'expo-app-loading';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

const height = Dimensions.get('window').height*0.3;
const width = Dimensions.get('window').width;

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
                    borderRadius: 5,
                }}>
                <Text style={{
                    color: '#001D3D'
                }}>Logout</Text>
            </TouchableOpacity>
            : 
            <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={login}
                    style={{
                        width: '80%',
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFD60A',
                        borderRadius: 5,
                    }}>
                    <Text style={{
                        color: '#001D3D'
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '80%',
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{
                        color: '#FFD60A',
                        textDecorationLine: 'underline'
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            }
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
