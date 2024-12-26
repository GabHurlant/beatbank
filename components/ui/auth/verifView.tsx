import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    text: string;
    icon: any;
    color: string;
}

export default function VerifView({text, icon, color}: Props) {
    return (
        <View style={{
            flexDirection: "row", 
            justifyContent: "flex-start",
            alignItems: 'center'
        }}>
            <FontAwesome name={icon} size={24} color={color} style={{marginRight:10}}/>
            <Text>{text}</Text>
        </View>
    );
}