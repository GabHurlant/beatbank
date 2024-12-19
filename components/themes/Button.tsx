import { Colors } from "./Colors";
import { useColorScheme } from "react-native";

const useButtonStyle = () => {
    const colorTheme = useColorScheme();
    const colors = Colors[colorTheme || "light"];

    return {
        primary: {
            backgroundColor: colors.colors[7],
            color: "#FFF",
            borderColor: undefined,
            borderWidth: undefined,
        },
        secondary: {
            backgroundColor: "#FFF",
            color: colors.colors[7],
            borderColor: colors.colors[7],
            borderWidth: 5,
        },
        disabled: {
            backgroundColor: colors.gray[0],
            color: colors.gray[3],
            borderColor: undefined,
            borderWidth: undefined,
        },
        hidde: {
            backgroundColor: "#FFF",
            color: colors.colors[7],
            borderColor: undefined,
            borderWidth: undefined,
        },
        discret: {
            backgroundColor: "",
            color: colors.gray[3],
            borderColor: undefined,
            borderWidth: undefined,
        },
    };
};

export default useButtonStyle;