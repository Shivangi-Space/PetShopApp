import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { usePetStore } from '../store/usePetStore';
import CartItemCard from '../components/CartItemCard';
import { Colors } from '../constants/Colors';
import Toast from 'react-native-toast-message';
import { ShoppingBag } from 'lucide-react-native';

const CartScreen = () => {

    const { cart, removeFromCart, getTotalPrice } = usePetStore();

    const handleRemove = (id: string) => {
        removeFromCart(id);
        Toast.show({
            type: 'info',
            text1: 'Removed',
            text2: 'Item removed from your cart',
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItemCard item={item} onRemove={handleRemove} />
                )}
                contentContainerStyle={styles.listContent}

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <ShoppingBag size={60} color={Colors.border} />
                        <Text style={styles.emptyText}>
                            Your cart is empty
                        </Text>
                    </View>
                }
            />

            {cart.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                            Total Amount:
                        </Text>
                        <Text style={styles.totalValue}>${getTotalPrice()}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.checkoutBtn}
                        onPress={() => Toast.show({ type: 'success', text1: 'Success', text2: 'Order placed!' })}
                    >
                        <Text style={styles.checkoutText}>Checkout Now</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 235
    },
    emptyText: {
        marginTop: 10,
        fontSize: 18,
        color: Colors.textLight,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    totalLabel: {
        fontSize: 16,
        color: Colors.textLight
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text
    },
    checkoutBtn: {
        backgroundColor: Colors.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center'
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default CartScreen;