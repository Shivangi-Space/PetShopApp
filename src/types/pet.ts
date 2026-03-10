export interface Pet {
    id: string;
    name: string;
    breed: string;
    age: string;
    price: string;
    imageUrl: string;
}

export interface CartItem extends Pet {
    quantity: number;
}