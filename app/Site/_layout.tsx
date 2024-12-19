// app/Site/_layout.tsx

import {  Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import DropDownMenu from "@/components/ui/dropDownMenu/DropDownMenu";



export default function SiteLayout(){

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

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerRight: ()=>(
                    <DropDownMenu
                        token={token}
                    />
                ),
                headerShadowVisible: false,
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: "Accueil",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Albums"
                options={{
                    title: "Vos albums",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="appstore-o" size={24} color={color} />
                    ),
                    headerShown: token!="" ? true:false,
                    tabBarStyle:{
                        display: token!="" ? 'flex':'none',
                    }
                }}
            />
            <Tabs.Screen
                name="Profil"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                    headerShown: token!="" ? true:false,
                    tabBarStyle:{
                        display: token!="" ? 'flex':'none',
                    }
                }}
            />
        </Tabs>
    );
}