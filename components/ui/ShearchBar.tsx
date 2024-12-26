//SearchBar
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Font } from '../themes/Font';

type Props = {
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
}

export default function SearchBar({placeholder, value, onChange}: Props) {
    return (
        <View style={styles.container}>
            <FontAwesome name="search" size={24} color="#0005"  style={{marginRight:8}}/>
            <TextInput
                style={styles.input}
                placeholderTextColor="#0005"
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
            />
            <FontAwesome name="microphone" size={24} color="#0005"  style={{marginLeft:10}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        margin: 10,
    },
    input: {
        fontSize: 16,
        flexGrow:1,
        color: "#000",
        marginLeft: 10,
        textAlign: "left",
    },
});