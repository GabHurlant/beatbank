import TextUi from "@/components/ui/TextUi";
import { View } from "react-native";

export default function Track({
    musics
}:{musics: any[]}){
    return(
        <View>
            <TextUi text="Tracklist:" type="h" priority={2}/>
            {
                musics.map((music, index)=>{
                    return(
                        <MusicsPreview music={music} index={index+1} key={index}/>
                    );
                })
            }
        </View>
    );
}

function MusicsPreview({music, index}:{music: any, index: number}){
    return(
        <View style={{
            flexDirection: "row",
            padding:5,
            justifyContent: "space-between",
            borderTopWidth:1,
            borderColor: "black"
        }}>
            <TextUi text={index+" - "+music.titre} type="p" priority={0}/>
            <TextUi text={music.duree.toString().replace(".", ":")} type="p" priority={2}/>
        </View>
    )
}