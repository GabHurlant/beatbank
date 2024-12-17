// @components/ui/navigation/Notconnected.tsx

import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Theme } from "@/components/theme";
import { Text, useColorScheme, StyleSheet } from "react-native";

export default function NotConnectedTabs() {
    const colorTheme = useColorScheme();
    const theme = Theme[colorTheme || "light"];

    return (
        <Tabs>
            <TabSlot />
            <TabList style={[styles.tabList, { backgroundColor: theme.background }]}>
                <TabTrigger name="Auth/SignIn" href="/Auth/SignIn">
                    <Text style={[styles.tabText, { color: theme.tabBarActive }]}>
                        Se connecter
                    </Text>
                </TabTrigger>
                <TabTrigger name="Home" href="/Site/Home">
                    <Text style={[styles.tabText, { color: theme.tabBarActive }]}>
                        Home
                    </Text>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabList: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
    tabTrigger: {
        padding: 10,
        alignItems: "center",
    },
    tabText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
