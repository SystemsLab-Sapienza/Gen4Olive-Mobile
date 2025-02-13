import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const Predict = ({ setPage, page, previous, setPrevious, predict }) => {
    console.log('Prediction:', predict);
    if (!predict) {
        return null;
    }
    if (page === 'olivePredict') {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 50, left: 20 }}
                    onPress={() => {
                    setPage(previous);
                    setPrevious('menu');
                    }}>
                    <Icon name="arrow-back" color={'white'} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20 , padding: 5}} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {
                        predict.map((item, index) => (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', margin: 10, padding: 10 }}>
                                <Text>{item.name}</Text>
                                <Text>{item.confidence_score}</Text>
                            </View>
                        ))
                    }
                </View>
        </View>
        );
    }
    if (page === 'diseasePredict') {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 50, left: 20 }}
                    onPress={() => {
                    setPage(previous);
                    setPrevious('menu');
                    }}>
                    <Icon name="arrow-back" color={'white'} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20 , padding: 5}} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {
                        predict.map((item, index) => (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', margin: 10, padding: 10 }}>
                                <Text>{item.disease_name}</Text>
                                <Text>{item.confidence_score}</Text>
                            </View>
                        ))
                    }
            </View>
        </View>
        );
    }
    return null;
};
