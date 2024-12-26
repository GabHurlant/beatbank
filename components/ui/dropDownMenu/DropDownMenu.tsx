import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkMenu from "./LinkMenu";
import { router } from "expo-router";
import LinearBackground from "../LinearBackground";

type Props = {
    token: string
};

export default function DropDownMenu({token}: Props) {
    const [open, setOpen] = useState(false);

    const toggleVisible=()=>{
        setOpen(!open);
    }

    return(
        <View>
            <AntDesign name="bars" size={24} color="black" style={{padding:10}} onPress={toggleVisible}/>
            {
                open && (
                    <View 
                        style={{
                            position:'absolute', 
                            top:0, 
                            right:0,
                            backgroundColor:'#000000DD',
                            width:Dimensions.get('window').width,
                            height:Dimensions.get('window').height,
                        }}
                    >
                        <LinearBackground 
                            style={{
                                position: "absolute",
                                right:0,
                                backgroundColor: "#00FFBF",
                                width: "60%",
                                height: "100%",
                            }}
                        >
                            <View style={{
                                alignItems: "flex-end"
                            }}>
                                <AntDesign name="bars" size={24} color="white" style={{padding:10}} onPress={toggleVisible}/>
                                <View>

                                </View>
                                <View style={{
                                    width: "100%",
                                    alignItems: "center"
                                }}>
                                    <LinkMenu
                                        title= "Recherche"
                                        icon="search1"
                                    />
                                    <LinkMenu
                                        title="Dashboard"
                                        icon="Trophy"
                                    />
                                    {
                                        token !="" && (
                                            <View 
                                                style={{
                                                    width: "100%",
                                                    alignItems: "center"
                                            }}>
                                                <LinkMenu
                                                    title="Liste d'écoute"
                                                    icon="sound"
                                                />
                                                <LinkMenu
                                                    title="Suggérer un album"
                                                    icon="edit"
                                                />
                                                <LinkMenu
                                                    title="Paramètres"
                                                    icon="setting"
                                                />
                                            </View>
                                        )
                                    }
                                    <LinkMenu
                                        title="Qui sommes-nous?"
                                        icon="questioncircle"
                                    />
                                    {
                                        token !="" ? (
                                            <LinkMenu
                                                title="Se déconnecter"
                                                icon="logout"
                                                onPress= {
                                                    async ()=>{
                                                        await AsyncStorage.removeItem("token");
                                                        router.push('/Auth/SignIn');
                                                    }
                                                }
                                            />
                                        ):(
                                            <LinkMenu
                                                title="Se connecter"
                                                icon="login"
                                                onPress= {
                                                    async ()=>{
                                                        router.push('/Auth/SignIn');
                                                    }
                                                }
                                            />
                                        )
                                    }
                                </View>
                            </View>
                        </LinearBackground>
                    </View>
                )

            }
        </View>
    );
}