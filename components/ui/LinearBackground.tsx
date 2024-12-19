import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

export default function LinearBackground({
    style,
    children,
} : Props) {
    return (
        <LinearGradient 
            colors={["#246555", "#00FFBF"]}
            start={[0,0]}
            end={[2,1]}
            style={style}
        >
            {children}
        </LinearGradient>
    )
}