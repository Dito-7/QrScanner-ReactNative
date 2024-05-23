import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import exportToExcel from '../utils/exportToExcel';

const HomeScreen = ({ navigation }) => {
    const [scannedData, setScannedData] = useState([]);
    const route = useRoute();

    useEffect(() => {
        if (route.params?.scannedData) {
            setScannedData([...scannedData, { id: scannedData.length.toString(), data: route.params.scannedData }]);
        }
    }, [route.params?.scannedData]);

    return (
        <View style={styles.container}>
            <Button title="Scan QR Code" onPress={() => navigation.navigate('QRScanner')} />
            <FlatList
                data={scannedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.data}</Text>
                )}
            />
            <Button
                title="Download as Excel"
                onPress={() => exportToExcel(scannedData)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default HomeScreen;
