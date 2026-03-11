import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { usePetStore } from '../store/usePetStore';
import PetCard from '../components/PetCard';
import { Colors } from '../constants/Colors';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {

    const pets = usePetStore((state) => state.pets);
    const addToCart = usePetStore((state) => state.addToCart);

    const handleAddToCart = (pet: any) => {
        addToCart(pet);
        Toast.show({
            type: 'success',
            text1: 'Added to Cart',
            text2: `${pet.name} is waiting for you!`,
            position: 'bottom',
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PetCard pet={item} onAddToCart={handleAddToCart} />
                )}
                contentContainerStyle={styles.listPadding}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No pets available right now.</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    listPadding: {
        padding: 20
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    emptyText: {
        color: Colors.textLight,
        fontSize: 16
    }
})

export default HomeScreen;