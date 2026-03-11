import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from "lucide-react-native";
import { Colors } from "../constants/Colors";
import { CartItem } from "../types/pet";

interface Props {
    item: CartItem,
    onRemove: (id: string) => void;
}

const CartItemCard = ({ item, onRemove }: Props) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            <View style={styles.details}>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <Text style={styles.breed}>
                    {item.breed}
                </Text>
                <Text style={styles.price}>
                    ${item.price} x {item.quantity}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => onRemove(item.id)}
            >
                <Trash2 size={20} color={Colors.error} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8
    },
    details: {
        flex: 1,
        marginLeft: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text
    },
    breed: {
        fontSize: 13,
        color: Colors.textLight,
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.primary,
        marginTop: 4
    },
    removeBtn: {
        padding: 10
    }
})

export default CartItemCard;