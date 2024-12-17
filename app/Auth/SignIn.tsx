import { Link, useRouter } from "expo-router";
import { Text, View,TextInputChangeEventData,NativeSyntheticEvent, StyleSheet,Pressable} from "react-native";
import AuthInput from "@/components/ui/AuthInput";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn(){
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const styles= StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: "#FFF",
            alignItems: "center",
        },
        form:{
            width:'80%',
            gap:16,
            paddingVertical:20,
        },
        button:{
            borderRadius:10,
            padding: 10,
        },
        buttonText:{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "bold"
        }
    })

    const router = useRouter();

    useEffect(()=>{
        const regex = /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsFormValid((email!="" && password!="" && regex.test(email)))
    }, [email, password])

    const handleSubmit=async ()=>{
        try{
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Spécifie que le corps est en JSON
                },
                body:JSON.stringify({
                    "email": email,
                    "password": password
                })
            })

            const data= await response.json();
            if(response.status==500){
                setMessage('Email ou mot de passe incorrect');
            }
            else{
                try{
                    await AsyncStorage.setItem('token', data.token);
                    router.push("/Site/Home");
                }catch(err){
                    console.error(err);
                }
            }
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <AuthInput
                    placeholder="Email"
                    value={email}
                    onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
                />
                <AuthInput
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(e.nativeEvent.text)}
                />
                {
                    message != "" ? <Text>{message}</Text>: null
                }
                <Link href="/Auth/ForgotPassword" style={{
                    textAlign: "center",
                    color: "#00E6A4"
                }}>Forget password?</Link>
                <Pressable onPress={handleSubmit} style={[styles.button, {backgroundColor: isFormValid?"#00BF7C" : "#F1F5F9"}]} disabled={!isFormValid}>
                    <Text style={[styles.buttonText, {color: isFormValid ? "#FFF":"#CBD5E1"}]}>Agree and Continue</Text>
                </Pressable>
            </View>
        </View>
    );
}