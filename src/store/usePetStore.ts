import { create } from 'zustand';
import { Pet, CartItem } from '../types/pet';

interface PetState {
  pets: Pet[]; 
  cart: CartItem[];
  addPet: (pet: Pet) => void; 
  addToCart: (pet: Pet) => void; 
  removeFromCart: (petId: string) => void; 
  getTotalPrice: () => number;
}

export const usePetStore = create<PetState>((set, get) => ({
  pets: [
    {
      id: '1',
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: '2',
      price: '500',
      imageUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg',
    },
    {
      id: '2',
      name: 'Max',
      breed: 'German Shepherd',
      age: '3',
      price: '700',
      imageUrl: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_16149.jpg',
    },
  ],
  
  cart: [],

  addPet: (pet) => set((state) => ({ 
    pets: [pet, ...state.pets] 
  })),

  addToCart: (pet) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === pet.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...pet, quantity: 1 }] };
  }),

  removeFromCart: (petId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== petId),
  })),

  getTotalPrice: () => {
    const { cart } = get(); 
    return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  },
}));