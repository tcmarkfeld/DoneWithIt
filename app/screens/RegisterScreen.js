import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/lists/Screen';
import { Form as Form, FormField, SubmitButton } from '../components/forms/index';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function RegisterScreen(props) {
    return (
        <Screen style={styles.container}>            
            <Form 
                initialValues={{ email: '', password: '', name: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
               <FormField  
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="account"
                    name="name"
                    placeholder="Name"
                    textContentType="name"
                />
               <FormField  
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />                
                <SubmitButton title="Register" />      
            </Form>    
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})

export default RegisterScreen;