import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from "react-native";

export default function DropDownMenu(){
    const [open, setOpen] = useState(false);

    const toggleVisible=()=>{
        setOpen(!open);
    }

    return(
        <View>
            <AntDesign name="bars" size={24} color="bleck" style={{padding:10}} onPress={toggleVisible}/>
            <View style={{
                position: "absolute",
                top: 55,
                right: 0,
                width: 200,
                height: 467,
                padding:10,
                backgroundColor: "#FFF",
                display: open ? "flex" : "none",
            }}>
                <Text>Menu 1</Text>
            </View>
        </View>
    );
}