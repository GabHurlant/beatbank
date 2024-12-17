import { View, StyleSheet, useColorScheme } from "react-native";
import { Link, RelativePathString } from "expo-router";
import { Theme } from '@/components/theme';

type Props = {
    title : string
    href : RelativePathString 
    discret?: boolean
}

const ButtonUi =({ title, href, discret=false }: Props) => {
    const colorTheme = useColorScheme();
    const theme= Theme[colorTheme || 'light'];

    const styles= StyleSheet.create({
        container:{
            backgroundColor: (!discret ? theme.button.background : theme.button.backgroundDiscret ),
            padding: 10,
            width: '70%',
            borderRadius: 10,
        },
        link:{
            fontSize: (!discret ? 20 : 13 ),
            color: (!discret ? theme.button.text : theme.button.textDiscret ),
            textAlign: 'center',
        }
    })

    return (
        <View style={styles.container}>
            <Link
                href={href}
                style={styles.link}
            >
                {title}
            </Link>
        </View>
    )
}

export default ButtonUi;