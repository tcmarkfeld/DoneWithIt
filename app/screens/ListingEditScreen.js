import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { Form, FormField, SubmitButton } from '../components/forms/index';
import Picker from '../components/lists/Picker';
import CategoryPickerItem from '../components/lists/CategoryPickerItem';
import Screen from '../components/lists/Screen';
import FormImagePicker from '../components/forms/FormImagePicker';
import useLocation from '../hooks/useLocation';
import listingsApi from '../api/listings';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image.")
});

const categories = [
    { label: "Furniture", value: 1, backgroundColor: '#fc5c65', icon: 'floor-lamp' },
    { label: "Cars", value: 2, backgroundColor: '#fd9644', icon: 'car' },
    { label: "Cameras", value: 3, backgroundColor: '#fed330', icon: 'camera' },
];

function ListingEditScreen() {
    const location = useLocation();

    const handleSubmit = async (listing) => {
        const result = await listingsApi.addListing({...listing, location});
        if (!result.ok)
            return alert('Could not save the listing.');
        alert('Success');
    }

    return (
        <Screen style={styles.container}>            
            <Form 
                initialValues={{ title: '', price: '', description: '', category: null, images: [] }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
               <FormField  
                    maxLength={255}
                    name="title"
                    placeholder="Title"
                />  
               <FormField  
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                    width={120}
                />
                <Picker 
                    items={categories}
                    name="category"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Category"
                    width='50%'
                />   
                 <FormField  
                    maxLength={255}
                    multiline
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />             
                <SubmitButton title="Post" />      
            </Form>    
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})

export default ListingEditScreen;