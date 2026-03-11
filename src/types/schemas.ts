import {z} from 'zod';

export const petSchema = z.object({
    name: z.string().min(1, "Pet name is required"),
    breed: z.string().min(1, "Breed is required"),
    age: z.string().min(1, 'Age is required'),
  price: z.string().min(1, 'Price is required'),
});

export type PetFormData = z.infer<typeof petSchema>