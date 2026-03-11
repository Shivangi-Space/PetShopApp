import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { Colors } from "../constants/Colors";

interface Props {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    keyboardType?: 'default' | 'numeric';
}

const CustomInput = ({ label, placeholder, value, onChangeText, error, keyboardType = 'default' }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput 
                style={[styles.input, error ? styles.inputError : null]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
            {error && <Text style={styles.errorText}> {error} </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 5,
    },
    input: {
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: Colors.text,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 4
    }
})

export default CustomInput;