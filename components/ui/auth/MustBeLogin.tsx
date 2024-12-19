import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MustBeLogin(){
    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
                Vous devez être connecté pour accéder à cette page.
            </Text>
            <View style={{
                alignItems: "center",
                gap:20
            }}>
                <Text style={styles.connectText}>
                    Connectez vous pour voir vos nouvelle recommendation spéciale.
                </Text>
                <Link style={styles.connectButton} href="/Auth/SignIn">Se connecter</Link>
            </View>
            <View style={{
                alignItems: "center",
                gap:20
            }}>
                <Text style={styles.SignUpText}>
                    Vous n'avez pas de compte? Créez rejoingné nous pour découvrir de nouvelle musique qui vous correspondront.
                </Text>
                <Link style={styles.signUpButton}  href="/Auth/SignUp">S'inscrire</Link>
            </View>
            <View style={{
                alignItems: "center",
                gap:20
            }}>
                <Text>Si vous ne vous connectez pas ou ne vous inscrivez pas, vous n'aurez pas accès à l'intégralité de notre application</Text>
                <Link style={{
                    color: "#666",
                    width: 300,
                    textAlign: "center",
                    backgroundColor: "#FFF",
                    padding: 10,
                    borderRadius: 10,
                }} href="/Site/Home">Continuer à découvrir notre application sans vous inscrire</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#E6F5F1",
        justifyContent: 'space-around',
        padding:10
    },
    messageText: {
        fontSize: 30,
    },
    connectText:{
        fontSize: 20,
    },
    connectButton:{
        fontSize: 20,
        color: '#FFF',
        padding:10,
        width: 300,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor:"#00BF7C",
    },
    SignUpText:{
        fontSize: 16,
    },
    signUpButton:{
        fontSize: 20,
        color: '#00BF7C',
        padding:10,
        width: 300,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor:"#FFF",
        borderColor: "#00BF7C",
        borderWidth: 5
    }
});