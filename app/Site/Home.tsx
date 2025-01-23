import { ScrollView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import TextUi from "@/components/ui/TextUi";
import SearchBar from "@/components/ui/ShearchBar";
import { Link } from "expo-router";

export default function Home(){
    const [token, setToken] = useState("");
    const [search, setSearch] = useState("");
    const [data, setData] = useState({});
    const [fact, setFact] = useState({});

    const [controllersAlbumsSearch, setControllersAlbumsSearch]= useState<AbortController[]>([]);
    const [controllersFact, setControllersFact]= useState<AbortController[]>([]);
    const [intervalsFact, setIntervalFact] = useState<NodeJS.Timeout[]>([]);

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        if(tokenUser != null){
            setToken(tokenUser);
        }
    }
    
    const clearIntervals= ()=>{
        intervalsFact.forEach(interval => clearInterval(interval));
        intervalsFact.length=0;
    }

    console.log(data);

    const factFind= async ()=>{
        try{
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'facts/alea');
            const data= await response.json();
            setFact(data);   
            clearIntervals();
            intervalsFact.push(setInterval(factFind, 5000));     
        }catch(err){
            console.log(err);
        }
    }

    const madeSearch= async ()=>{
        try{
            // aborte tous les fetch de search
            controllersAlbumsSearch.forEach(controller => {
                controller.abort();
            });
            controllersAlbumsSearch.length = 0;

            const controller = new AbortController();
            controllersAlbumsSearch.push(controller);

            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'search/albums/'+search+'/0',{
                signal: controller.signal
            });
            const data= await response.json();

            clearIntervals();
            setFact({});

            setData(data);
            setControllersAlbumsSearch([]);
            
        }
        catch(err){
            console.log(err);
        }
    }

    const searchText=()=>{
        if(search.length >= 1){
            factFind();
            madeSearch()
        }
        else{
            setData({});
        }
    }

    useEffect(()=>{
        searchText();
    },[search]);

    useEffect(()=>{
        getToken();
    })
    return(
        <View style={{
            flex:1,
            alignItems: 'center',
            gap: 20,
        }}>
            <SearchBar
                placeholder="Rechercher"
                value={search}
                onChange={(text)=>{setSearch(text)}}
            />
            <ScrollView style={{
                overflow: 'scroll',
                width: '95%',
                height: '80%',
            }}>
                <View style={{
                    height: "100%",
                    gap: 20,
                }}>{
                    fact.text ? 
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            gap:20,
                            width: "100%",
                            padding: 40,
                            margin: "auto",
                            borderColor: "#00BF7C",
                            borderWidth: 5,
                            borderRadius: 20
                        }}>
                            <TextUi text={"Le saviez-vous ?"} type={"h"} priority={0}/>
                            <TextUi text={fact.text} type={"h"} priority={3} />
                        </View>
                    :
                        <View>
                            <Text>Albums</Text>
                        {
                            data.length > 0 ?
                                data.map((album: any, index: number)=>(
                                    <Link href={{
                                        pathname: '/Site/Details/[type]/[id]', 
                                        params: { type: 'albums', id: album.id }
                                    }} key={index}>{album.nom}</Link>
                                ))
                            : null
                        }
                        </View>
                }
                </View>
            </ScrollView>
        </View>
    )
}