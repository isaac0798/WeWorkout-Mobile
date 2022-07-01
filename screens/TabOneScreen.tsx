import React from "react";
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

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

  const [email, setEmail] = React.useState("email");
  const [password, setPassword] = React.useState("password");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tokenKey, setTokenKey] = React.useState("");
  const [username, setUsername] = React.useState("");

  return (
    <View style={styles.container}>
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                color: 'white'
            }}
            onChangeText={setEmail}
            value={email}/>
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                color: 'white'
            }}
            onChangeText={setPassword}
            value={password} />
        {loggedIn ?
        <TouchableOpacity
            onPress={logout}
            style={{
                backgroundColor:"green"
            }}>
            <Text>Logout</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity
            onPress={login}
            style={{
                backgroundColor:"green"
            }}>
            <Text>Login</Text>
        </TouchableOpacity>
        }

        <Text style={{color: 'white'}}>Welcome {username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
