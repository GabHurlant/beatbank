import { Link, useRouter } from "expo-router";
import { Text, View,TextInputChangeEventData,NativeSyntheticEvent, StyleSheet,Pressable} from "react-native";
import AuthInput from "@/components/ui/AuthInput";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonUi from '@/components/ui/ButtonUi';

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
            width: "90%" , 
            alignItems: 'center',
            gap:16,
            paddingVertical:20,
        },
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
                <View style={{
                    width: "100%",
                    gap: 10,
                }}>
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
                </View>
                <ButtonUi href="./ForgotPassword" title="Forget password?" type='hidde'/>
                <ButtonUi onPress={handleSubmit} title= "Se connecter" type={isFormValid ? 'primary' : 'disabled'}/>
                <ButtonUi href={"./SignUp"} title="Je n'ai pas de compte" type="secondary" />
                <ButtonUi title="Aller à la page d'accueil" href={"../Site/Home"} type="discret"/>
            </View>
        </View>
    );
}