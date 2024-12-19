import { Stack , useRouter} from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Theme } from '@/components/theme';
import {TouchableOpacity, useColorScheme} from 'react-native';

export default function AuthLayout(){
    const colorTheme = useColorScheme();
    const theme= Theme[colorTheme || 'light'];

    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerTitleStyle:{
                    color: theme.auth.header.text,
                },
                headerShadowVisible: false,
                headerLeft: ()=>{
                    return (
                        <TouchableOpacity onPress={()=>{router.push('/')}} style={{
                            padding: 10,
                        }}>
                            <FontAwesome name="arrow-left" size={20} color={theme.auth.header.text} />
                        </TouchableOpacity>
                    );
                }
            }}
        >
            <Stack.Screen 
                name="SignIn"
                options={{
                    title: "Connexion"
                }}
            />
            <Stack.Screen 
                name="SignUp"
                options={{
                    title: "Inscription"
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                options={{
                    title: "Mot de passe oublié",
                    headerLeft: ()=>{
                        return (
                            <TouchableOpacity onPress={()=>{router.push('/Auth/SignIn')}}>
                                <FontAwesome name="arrow-left" size={20} color={theme.auth.header.text} />
                            </TouchableOpacity>
                        );
                    }
                }}
            />
        </Stack>
    );
}