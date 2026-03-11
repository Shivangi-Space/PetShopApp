import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { ShoppingCart, Dog, ImageOff } from "lucide-react-native";
import { Colors } from "../constants/Colors";
import { Pet } from "../types/pet";

interface PetCardProps {
    pet: Pet;
    onAddToCart: (pet: Pet) => void;
}

const PetCard = ({ pet, onAddToCart }: PetCardProps) => {

    const hasImage = pet.imageUrl && pet.imageUrl.trim() !== '';
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {hasImage ? (
                    <Image
                        source={{ uri: pet.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <ImageOff size={40} color={Colors.textLight} strokeWidth={1.5} />
                        <Text style={styles.placeholderText}>No Image Available</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.cont}>
                    <Text style={styles.name}>{pet.name}</Text>
                <View style={styles.priceRow}>
                    {/* <Text style={styles.priceLabel}>Price:</Text> */}
                    <Text style={styles.priceValue}>${pet.price}</Text>
                </View>
                </View>

                <View style={styles.breedRow}>
                    <Dog size={14} color={Colors.textLight} />
                    <Text style={styles.breed}>{pet.breed}</Text>
                </View>

                

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => onAddToCart(pet)}
                    activeOpacity={0.7}
                >
                    <ShoppingCart size={18} color="white" />
                    <Text style={styles.addButtonText}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#F1F2F6',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    placeholderText: {
        color: Colors.textLight,
        fontSize: 12,
        fontWeight: '500',
    },
    infoContainer: {
        padding: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4
    },
    breedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    breed: {
        fontSize: 14,
        color: Colors.textLight,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        marginBottom: 15
    },
    priceLabel: {
        fontSize: 16,
        color: Colors.textLight,
    },
    priceValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    addButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        gap: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default PetCard;