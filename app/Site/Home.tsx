import { ScrollView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import TextUi from "@/components/ui/TextUi";
import SearchBar from "@/components/ui/ShearchBar";

export default function Home(){
    const [token, setToken] = useState("");
    const [search, setSearch] = useState("");
    const [data, setData] = useState({});

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        if(tokenUser != null){
            setToken(tokenUser);
        }
    }

    console.log(data);

    const madeSearch= async ()=>{
        try{
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'search/'+search);
            setData(await response.json());
        }
        catch(err){
            console.log(err);
        }
    }

    const searchText=()=>{
        search.length >= 1 ? madeSearch() : setData({});
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
                    gap: 20,
                }}>
                    <View>
                        <Text>Artiste</Text>
                    {
                        data.artistes && data.artistes.length > 0 ?
                            data.artistes.map((artiste: any, index: number)=>(
                                <Text key={index}>{artiste.pseudo}</Text>
                            ))
                        : null
                    }
                    </View>
                    <View>
                        <Text>Albums</Text>
                    {
                        data.albums && data.albums.length > 0 ?
                            data.albums.map((album: any, index: number)=>(
                                <Text key={index}>{album.nom}</Text>
                            ))
                        : null
                    }
                    </View>
                    <View>
                        <Text>Musiques</Text>
                    {
                        data.musics && data.musics.length > 0 ?
                            data.musics.map((titre: any, index: number)=>(
                                <Text key={index}>{titre.titre}</Text>
                            ))
                        : null
                    }
                    </View>
                    <View>
                        <Text>Styles</Text>
                    {
                        data.styles && data.styles.length > 0 ?
                            data.styles.map((style: any, index: number)=>(
                                <Text key={index}>{style.nom}</Text>
                            ))
                        : null
                    }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}