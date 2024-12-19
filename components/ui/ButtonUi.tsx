import { View, Text, StyleSheet, useColorScheme, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { Link, RelativePathString } from "expo-router";
import useButtonStyle from "../themes/Button";

type Props = {
    title : string
    href ?: RelativePathString 
    type: 'primary'|'secondary'|'disabled'|'hidde'|'discret'
    onPress?: () => void
}

const ButtonUi =({ title, href, type, onPress }: Props) => {
    const button= useButtonStyle()[type];

    const containerStyle: StyleProp<ViewStyle> = {
        backgroundColor: button.backgroundColor,
        padding: 10,
        width: '90%',
        borderRadius: 10,
        ...(button.borderColor
            ? { borderColor: button.borderColor, borderWidth: button.borderWidth }
            : {}),
    };

    const styles = StyleSheet.create({
        link: {
            fontWeight: 'bold',
            textAlign: 'center',
            color: button.color,
        },
    });

    if (href) {
        // Render Link component for navigable button
        return (
            <View style={containerStyle}>
                <Link href={href} style={styles.link}>
                    {title}
                </Link>
            </View>
        );
    }

    // Render TouchableOpacity for actionable button
    return (
        <TouchableOpacity style={containerStyle} onPress={onPress} disabled={type === 'disabled'}>
            <Text style={styles.link}>{title}</Text>
        </TouchableOpacity>
    );
}

export default ButtonUi;