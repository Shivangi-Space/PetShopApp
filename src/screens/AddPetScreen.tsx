import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    Linking,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Colors } from "../constants/Colors";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import { usePetStore } from "../store/usePetStore";
import { PetFormData, petSchema } from "../types/schemas";
import CustomInput from "../components/CustomInput";

const AddPetScreen = () => {

    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchingImage, setFetchingImage] = useState(false);
    const addPetToStore = usePetStore((state) => state.addPet);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<PetFormData>({
        resolver: zodResolver(petSchema)
    })

    const pickImage = async (useCamera: boolean) => {
        try {
            const permissionResult = useCamera
                ? await ImagePicker.requestCameraPermissionsAsync()
                : await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                if (!permissionResult.canAskAgain) {
                    Alert.alert(
                        "Permission Required",
                        `To upload a pet photo, we need access to your ${useCamera ? 'camera' : 'gallery'}. Please enable it in settings.`,
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Open Settings", onPress: () => Linking.openSettings() } // This opens the phone settings
                        ]
                    );
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Permission Denied',
                        text2: `You need to grant ${useCamera ? 'camera' : 'gallery'} access to upload photos.`
                    });
                }
                return;
            }

            let result;
            if (useCamera) {
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                });
            }

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Image Picker Error: ", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong while opening the camera.'
            });
        }
    };

    const onSubmit = async (data: PetFormData) => {
        if (!image) {
            Toast.show({ 
                type: 'error', 
                text1: 'Image Required', 
                text2: 'Please upload or fetch a pet image first.' 
            });
            return;
        }

        setLoading(true);
        try {
            const apiPayload = {
                name: data.name,
                breed: data.breed,
                age: data.age,
                price: data.price,
                image: "image_uploaded_successfully" 
            };

            await axios.post('https://jsonplaceholder.typicode.com/posts', apiPayload);

            addPetToStore({
                id: Math.random().toString(), // Generate a random ID
                ...data,
                imageUrl: image, // The real local/fetched URI
            });

            Toast.show({ 
                type: 'success', 
                text1: 'Success!', 
                text2: `${data.name} has been listed for sale.` 
            });

            reset();
            setImage(null);
            
        } catch (error: any) {
            console.log("Full Error:", error);
            Toast.show({ 
                type: 'error', 
                text1: 'Submission Failed', 
                text2: 'The mock server rejected the request. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomImage = async () => {
        setFetchingImage(true);
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');

            if (response.data.status === 'success') {
                setImage(response.data.message);
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Fetched a cute random dog image.',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'API error',
                text2: 'Could not fetch random image.'
            });
        } finally {
            setFetchingImage(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <View style={styles.imageSection}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <ImageIcon color={Colors.textLight} size={30} />
                            <Text style={{ color: Colors.textLight }}>
                                No Image selected
                            </Text>
                        </View>
                    )}

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.imageBtn} onPress={() => pickImage(false)}>
                            <ImageIcon size={20} color="white" />
                            <Text style={styles.btnText}>
                                Gallery
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.imageBtn, { backgroundColor: Colors.textLight }]} onPress={() => pickImage(true)}>
                            <Camera size={20} color="white" />
                            <Text style={styles.btnText}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.randomBtn}
                        onPress={fetchRandomImage}
                        disabled={fetchingImage}
                    >
                        {fetchingImage ? (
                            <ActivityIndicator color={Colors.primary} />
                        ) : (
                            <Text style={styles.randomBtnText}>
                                ✨ Get Random Dog Photo
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.formCard}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput label="Pet Name" placeholder="e.g. Buddy" value={value} onChangeText={onChange} error={errors.name?.message} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="breed"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput label="Breed" placeholder="e.g. Golden Retriever" value={value} onChangeText={onChange} error={errors.breed?.message} />
                        )}
                    />

                    <View style={styles.row}>
                        <View style={{
                            flex: 1,
                            marginRight: 10
                        }}>
                            <Controller
                                control={control}
                                name="age"
                                render={({ field: { onChange, value } }) => (
                                    <CustomInput label="Age (Years)" placeholder="2" value={value} onChangeText={onChange} error={errors.age?.message} keyboardType="numeric" />
                                )}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field: { onChange, value } }) => (
                                    <CustomInput label="Price ($)" placeholder="500" value={value} onChangeText={onChange} error={errors.price?.message} keyboardType="numeric" />
                                )}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitBtn, loading && { opacity: 0.7 }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitBtnText}> List Pet For Sale</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        backgroundColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    imageBtn: {
        flex: 0.48,
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    formCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    randomBtn: {
        marginTop: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    randomBtnText: {
        color: Colors.primary,
        fontWeight: '600'
    }
})

export default AddPetScreen;