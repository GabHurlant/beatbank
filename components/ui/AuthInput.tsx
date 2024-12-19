import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, TextInputProps } from "react-native"
import {TextInput} from "react-native";

type Props={
    placeholder?: string,
    value?: string,
    autoComplete?: TextInputProps,
    secureTextEntry?: boolean
    onChange: (e : NativeSyntheticEvent<TextInputChangeEventData>) => void
}

export default function AuthInput({
    placeholder="",
    value="",
    secureTextEntry=false,
    onChange= (e : NativeSyntheticEvent<TextInputChangeEventData>)=>{console.log(e)}
}: Props){
    const styles= StyleSheet.create({
        input:{
            borderRadius:10,
            padding: 16 ,
            borderWidth: 1,
            borderColor:"#00BF7C"
        },
    })
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#00BF7C"
            value={value}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            onChange={onChange}
        />
    );
}