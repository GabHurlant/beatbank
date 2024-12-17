import { Link, useRouter } from "expo-router";
import { KeyboardAvoidingView, ScrollView,Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { StyleSheet, TextInputChangeEventData,NativeSyntheticEvent, Platform} from 'react-native';
import AuthInput from "@/components/ui/AuthInput";
import VerifView from "@/components/ui/auth/verifView";
import PasswordStrength from "@/components/ui/auth/PasswordStrength";

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [prenom, setPrenom]= useState("");
    const [nom, setNom]= useState("");
    const [message, setMessage]= useState("");
    const [error, setError] = useState({
        email: true,
        password: {
            error: true,
            previusInfo: false,
            length: true,
            caractere: true,
            space: false
        },
    });
    const [isFormValid, setIsFormValid]= useState(false);

    const router=useRouter();

    const styles= StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        content: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
            gap: 20,
        },
        inputs:{
            gap:16,
            width: '80%'
        },
        button:{
            borderRadius:10,
            padding: 10,
        },
        buttonText:{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "bold"
        },
        link:{
            color:"#00BF7C",
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
            textDecorationColor: "#00BF7C",
            fontWeight: 'bold'
        },
    })

    const verifPasswordStrength = ()=>{
        const test = {
            error: false,
            previusInfo: nom!="" && prenom!="" && email!="" ? (password.toLocaleLowerCase().includes(nom.toLocaleLowerCase()) || password.toLocaleLowerCase().includes(prenom.toLocaleLowerCase()) || password.toLocaleLowerCase().includes(email.toLocaleLowerCase())) : false,
            length: password.length < 8,
            caractere: !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[@!.?;:!#*-+]/.test(password),
            space: password.includes(' '),
        };

        test.error = Object.values(test).some((value, index) => index > 0 && value); // Ignore the first value (error)

        setError((prev) => ({ ...prev, password: test }));
    }

    const verifEmail = ()=>{
        const regex = /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(email)) {
            setError((prev) => ({ ...prev, email: false }));
        }
        else{
            setError((prev) => ({ ...prev, email: true }));
        }
    }

    useEffect(()=>{
        verifEmail();
        verifPasswordStrength();
    },[email, password, prenom, nom])

    useEffect(()=>{
        const isValid =
            email !== "" &&
            password !== "" &&
            nom !== "" &&
            prenom !== "" &&
            !error.email &&
            !error.password.error;
        setIsFormValid(isValid);
    },[error, email, password, prenom, nom])

    const handleSubmit=async ()=>{
        try{
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL+'users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Spécifie que le corps est en JSON
                },
                body:JSON.stringify({
                    "nom": nom,
                    "prenom": prenom,
                    "email": email,
                    "password": password
                })
            });
            if(response.status==500){
                setMessage("Cet email est déjà utilisé par un autre compte.");
            }
            else{
                router.push('/Auth/SignIn');
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0} // Ajustez selon votre design
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.inputs}>
                    {
                        message!="" ?
                            <Text style={{color: 'red'}}>{message}</Text>:null
                    }
                    <View style={{gap:8}}>
                        <AuthInput
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setPrenom(e.nativeEvent.text)}
                        />
                        <AuthInput
                            placeholder="Nom"
                            value={nom}
                            onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setNom(e.nativeEvent.text)}
                        />
                        <Text>Make sure it matches the name on your government ID.</Text>
                    </View>
                    <AuthInput
                        placeholder="Email"
                        value={email}
                        onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
                    />
                    {
                        error.email ? 
                            <VerifView 
                                text = "Invalid email address"
                                color ="red"
                                icon = "exclamation-circle"
                            />: 
                            <VerifView
                                text = "Valid email adddress"
                                color = "green"
                                icon = "check-circle"
                            />
                    }
                    <Text>We will email you trip confirmations and receipts.</Text>
                    <AuthInput
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(e.nativeEvent.text)}
                    />
                    {
                        <PasswordStrength error={error.password}/>
                    }
                </View>
                <View style={{gap:16, width: "90%"}}>
                    <Text style={{textAlign: 'center'}}>
                        By selecting Agree and continue, I agree to Dynamic Layers <Link style={styles.link} href="/Legal/TermsOfService">Terms of Service</Link>, <Link style={styles.link} href="/Legal/PaymentsTerms">Payments Terms of Service</Link> and <Link style={styles.link} href="/Legal/NotificationPolicy">Notification Policy</Link> and acknowledge the <Link style={styles.link} href="/Legal/PrivacyPolicy">Privacy Policy</Link>.
                    </Text>
                    <Pressable onPress={handleSubmit} style={[styles.button, {backgroundColor: isFormValid?"#00BF7C" : "#F1F5F9"}]} disabled={!isFormValid}>
                        <Text style={[styles.buttonText, {color: isFormValid ? "#FFF":"#CBD5E1"}]}>Agree and Continue</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}