import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import MustBeLogin from "@/components/ui/auth/MustBeLogin";

export default function AlbumsScreen(){
    const [token, setToken] = useState("");

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        if(tokenUser != null){
            setToken(tokenUser);
        }
    }

    useEffect(()=>{
        getToken();
    })
    return token != "" ? <Text>Token: {token}</Text> : <MustBeLogin/>
}