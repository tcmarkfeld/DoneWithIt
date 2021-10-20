import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Button from '../components/lists/Button'
import Card from '../components/lists/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import routes from '../navigation/routes';
import Screen from '../components/lists/Screen';
import { useState } from 'react';
import { useEffect } from 'react';
import AppText from '../components/lists/Text';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

function ListingsScreen({ navigation }) {
    const {data: listings, error, loading, request: loadListings} = useApi(listingsApi.getListings);

    useEffect(() => {
        loadListings(1, 2, 3);
    }, []);

    return (
        <Screen style={styles.screen}>
            {error && <>
                <AppText>Couldn't retrieve the listings.</AppText>
                <Button title="Retry" onPress={loadListings} />
            </>}
            <ActivityIndicator visible={loading} />
            <FlatList
                data={listings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({item}) =>
                    <Card 
                        title={item.title}
                        subTitle={"$" + item.price}
                        imageUrl={item.images[0].url}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)} />}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    }
})

export default ListingsScreen;