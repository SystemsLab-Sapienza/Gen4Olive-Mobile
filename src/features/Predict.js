import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export const Predict = ({ setPage, page, previous, setPrevious, predict, t }) => {
    // console.log('Prediction:', predict);

    const DinamicPredict = useMemo(() => {
        return predict.map((item, index) => (
            <View key={index} style={styles.item}>
                <View style={styles.itemContent}>
                    <Image source={{ uri: item.thumbnail }} style={styles.img2} />
                    <View style={styles.cardText}>
                        {page === 'olivePredict' ? (
                            <Text style={styles.title}>{item.name}</Text>
                        ) : (
                            <Text style={styles.title}>{item.disease_name}</Text>
                        )}
                        <Text style={styles.confidenceScore}>{Number(item.confidence_score)*100}% {t('confidence')}</Text>
                    </View>
                </View>
            </View>
        ));
    }, [predict]);

    if (page === 'olivePredict' || page === 'diseasePredict') {
        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image source={require('../../assets/LOGO.png')} style={styles.img} />
                    <View style={styles.arrow}>
                        <TouchableOpacity
                            onPress={() => {
                                setPage(previous);
                                setPrevious('menu');
                            }}
                        >
                            <Image source={require('../../assets/ArrowWhite.png')} />
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>
                            {page === 'olivePredict' ? t('oliveDetection') : t('diseaseDetection')}
                        </Text>
                    </View>
                </View>
                <View style={styles.predictionContainer}>
                    {predict.length > 0 ? DinamicPredict : <Text style={styles.noPredictions}>{t('noDetection')}</Text>}
                </View>
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#5F5F2E',
    },
    arrow: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: 20,
        bottom: 20,
    },
    icon: {
        flex: 0.35,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    img: {
        resizeMode: 'contain',
        width: '30%',
        marginBottom: 10,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 75,
        marginBottom: 10,
        flexDirection: 'row',
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    img2: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    cardText: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333', // Darker text for better readability
    },
    confidenceScore: {
        fontSize: 14,
        color: '#666', // Lighter text for less emphasis
    },
    pageTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    predictionContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    noPredictions: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999', // Grey color for no predictions message
        marginTop: 20,
    },
});
