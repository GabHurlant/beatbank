import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TextUi from "../TextUi";

export default function Stars({notes}: {notes: any[]}){
    let moy=0;
    let star= {};
    let max=0;
    notes.sort((a,b)=>b.note-a.note);
    notes.forEach((note, index) => {
        moy += note.note;
        star[note.note] = star[note.note] ? star[note.note]+1 : 1;
        star[note.note]>max ? max=star[note.note]:  null;
    });
    moy = moy/notes.length;
    moy = Math.round(moy * 2) / 2;
    const fullStars= Math.floor(moy);
    let halfStars = !Number.isNaN(moy) && moy % 1 !== 0 ? 1 : 0;  // Une demi-étoile si la moyenne n'est pas entière
    let emptyStars = 5 - fullStars - halfStars;
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
                gap: 5,
                padding: 5,
            }}>
                {Array.from({ length: fullStars }).map((_, index) => (
                    <FontAwesome key={`full-${index}`} name="star" size={24} color="black" />
                ))}
                {halfStars === 1 && (
                    <FontAwesome name="star-half-empty" size={24} color="black" />
                )}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star-o" size={24} color="black" />
                ))}
            </View>
            <TextUi text="Notations générales" type="h" priority={4}></TextUi>
            <View style={{
                margin: 10,
            }}>
                <View style={{
                    flexDirection: "row",
                    padding:5,
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}>
                    {Array.from({ length: 10 }, (_, index) => (
                        <Block height={Math.round(((star[0.5*(index+1)] || 0)/max)*50)} key={index} />
                    ))}
                </View>
                <View style={{
                    flexDirection: "row",
                    padding:5,
                    justifyContent: 'space-between',
                    borderColor: "black",
                    alignItems: 'center',
                    borderTopWidth:1
                }}>
                    <Text>0.5</Text>
                    <Text>5</Text>
                </View>
            </View>
        </View>
    )
}

function Block({height}:{height: number}){
    return (
        <View style={{
            width: 30,
            height: height,
            backgroundColor: "#000",
            borderColor: "black",
            borderTopWidth:1
        }}></View>
    );
}