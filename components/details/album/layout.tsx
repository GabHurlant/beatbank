import Stars from "@/components/ui/note/stars";
import { Text, View } from "react-native";
import Track from "./track";
import CritiquePreview from "./note";

type Props={
    item: any
}

export default function AlbumDetail({item}: Props){
    let time=[0,0];
    item.Musics.forEach((music: any) => { 
        const duree= music.duree.toString().split(".");
        time[1] += parseInt(duree[1]);
        if(time[1] >= 60){
            time[0] += 1;
            time[1] -= 60;
        }
        time[0] += parseInt(duree[0]);
    });
    return(
        <View>
            <View>
                <Text>{item.nom}</Text>
                <Text>{item.Artiste.pseudo}</Text>
                <Text>{item.Producteur.label}</Text>
                <Text>{item.sortie.split("-")[0]+" - "+time+"min"}</Text>
            </View>
            <Stars notes={item.Notes}/>
            <Track musics={item.Musics}/>
            <CritiquePreview />
        </View>
    )
}