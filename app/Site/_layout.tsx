// app/Site/_layout.tsx

import {  Tabs } from "expo-router";
import { Theme } from '@/components/theme';
import {useColorScheme, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import NotConnectedTabs from "@/components/ui/navigation/Notconnected";
import DropDownMenu from "@/components/ui/dropDownMenu/DropDownMenu";



export default function SiteLayout(){
    const colorTheme = useColorScheme();
    const theme= Theme[colorTheme || 'light'];

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

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerRight: ()=>(
                    <DropDownMenu/>
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
                    )
                }}
            />
            <Tabs.Screen
                name="Profil"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}