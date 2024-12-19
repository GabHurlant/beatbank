import { View, Image, StyleSheet, useColorScheme} from "react-native";
import { Theme } from '@/components/theme';
import ButtonUi from '@/components/ui/ButtonUi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
    const colorTheme = useColorScheme();
    const theme= Theme[colorTheme || 'light'];

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 50,
          backgroundColor: theme.background,
        },
        image:{
            width: 200,
            height: 200,
        }
    });
    const router= useRouter();

    const getToken=async ()=>{
        const tokenUser = await AsyncStorage.getItem('token');
        if(tokenUser != null){
            router.push('/Site/Home');
        }
    }
    
    useEffect(()=>{
        getToken();
    })

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('@/assets/images/BeatBank.png')} />
            <ButtonUi title="Inscription" href={"./Auth/SignUp"} type="primary" />
            <ButtonUi title="Connexion" href={"./Auth/SignIn"} type="primary"/>
            <ButtonUi title="Passer cette étape" href={"./Site/Home"} type="discret"/>
        </View>
    );
}