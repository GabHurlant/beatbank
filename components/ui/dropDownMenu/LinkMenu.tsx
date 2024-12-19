import { Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from "react-native";

type Props = {
    title: string
    icon: any
    onPress?: () => void
}

export default function LinkMenu({
    title,
    icon,
    onPress= ()=>{},
}: Props) {
    return(
        <Pressable style={{
            flexDirection: 'row',
            borderTopColor: "#FFF",
            borderTopWidth: 1,
            paddingVertical:5,
            gap: 10,
            width: "95%",
            marginBottom: 15
        }}    
            onPress={onPress}
        >
            <AntDesign name={icon} size={24} color="white" />
            <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white"
            }}>{title}</Text>
        </Pressable>
    );
}