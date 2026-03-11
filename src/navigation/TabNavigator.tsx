import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PlusCircle, ShoppingCart } from 'lucide-react-native'; 
import { Colors } from '../constants/Colors';
import { usePetStore } from '../store/usePetStore';

import HomeScreen from '../screens/HomeScreen';
import AddPetScreen from '../screens/AddPetScreen';
import CartScreen from '../screens/CartScreen';
import { RootTabParamList } from './types';
import CustomHeader from '../components/CustomHeader';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {

    const cart = usePetStore((state) => state.cart);
    const cartCount = cart.length;

  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ options }) => (
          <CustomHeader title={options.headerTitle as string} />
        ),
        tabBarActiveTintColor: Colors.primary,   
        tabBarInactiveTintColor: Colors.textLight, 
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 65, 
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: Colors.card,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: Colors.text,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: 'Pets list', 
        }}
      />

      <Tab.Screen 
        name="AddPet" 
        component={AddPetScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />,
          headerTitle: 'Register Pet',
        }}
      />

      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
          headerTitle: 'My Cart',
           tabBarBadge: cartCount > 0 ? cartCount : undefined, 
          tabBarBadgeStyle: { backgroundColor: Colors.secondary, color: 'white' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;