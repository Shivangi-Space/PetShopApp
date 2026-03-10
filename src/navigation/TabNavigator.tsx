import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PlusCircle, ShoppingCart } from 'lucide-react-native'; 
import { Colors } from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import AddPetScreen from '../screens/AddPetScreen';
import CartScreen from '../screens/CartScreen';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,   
        tabBarInactiveTintColor: Colors.textLight, 
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 60, 
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
          headerTitle: 'Pet Shop', 
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
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;