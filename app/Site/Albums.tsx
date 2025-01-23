import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import MustBeLogin from "@/components/ui/auth/MustBeLogin";
import getGropChatCompletion from "@/components/recomendation";


export default function AlbumsScreen(){
    const [token, setToken] = useState("");
    const [albumReco, setAlbumReco] = useState([]);

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        if(tokenUser != null){
            setToken(tokenUser);
        }
    }

    const query= async ()=>{
        try{
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'notes/last/1/10');
            const data= await response.json();  
            const res = await getGropChatCompletion(data, 10);
            setAlbumReco(res);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getToken();
        query();
    }, [])
    return token != "" && albumReco.length != 0 ? (
        <View>
            <Text>Albums recommandé pour vous: </Text>
            {albumReco.map((element: any, index: number)=>{
                return <Text key={index}>{element[0]} - {element[1]}</Text>
            })}
        </View>
    ) : <MustBeLogin/>
}