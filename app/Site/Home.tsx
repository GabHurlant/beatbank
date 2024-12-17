import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function Home(){
    const [token, setToken] = useState("");

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        console.log(tokenUser);
        if(tokenUser != null){
            console.log(tokenUser);
            setToken(tokenUser);
        }
    }

    useEffect(()=>{
        getToken();
    })
    return(
        <View>
            <Text>Home page</Text>
            <Text>Token: {token}</Text>
        </View>
    )
}