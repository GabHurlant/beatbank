import { StyleSheet, Text } from "react-native";
import { Font } from "../themes/Font";

type Props = {
    text: string;
    type: "h" | "p";
    color?: string;
    priority: number;
}

export default function TextUi({
    text,
    type,
    priority,
    color
} : Props) {

    return(
        <Text style={{
            fontSize: Font[type][priority][0],
            color: color,
            fontWeight: type !== 'h' ? Font[type][priority][1] || "normal" :  "bold",
        }}>{text}</Text>
    );
}