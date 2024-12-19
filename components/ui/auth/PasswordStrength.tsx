import { View } from "react-native";
import VerifView from "./verifView";

type Error= {
    error: boolean,
    previusInfo: boolean,
    length: boolean,
    caractere: boolean,
    space: boolean
}

export default function PasswordStrength(error : Error){

    const texts ={
        length:"Must be at least 8 characters",
        previusInfo:"Can not include your name or email address",
        caractere:"Must have at least one symbol and one number",
        space:"Can not include spaces",
    };
    const it=0;
    return (
        <View>
            {
                error.error.error == true ? 
                    <View>
                        <VerifView
                            text= "Password strength: weak"
                            color= "red"
                            icon = "exclamation-circle"
                        />
                        {
                            Object.entries(error.error).slice(1).map(([key, value])=>{
                                return(
                                    <VerifView
                                        key={key}
                                        text={texts[key]}
                                        color="black"
                                        icon={value ? "times-circle-o" : "check-circle-o"}
                                    />
                                );
                            })
                        }
                    </View>
                    :
                    <VerifView
                        text = "Password stregth: excellent"
                        color = "green"
                        icon = "check-circle"
                    />
            }
        </View>         
    );
}