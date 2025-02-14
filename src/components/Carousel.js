import { t } from 'i18next';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const Carousel = ({ api, t }) => {
    const [currentTab, setCurrentTab] = React.useState('tree_photos');
    const [currentImage, setCurrentImage] = React.useState(0);

    const tabs = () => {
        if (api.photographed_in === "WOGB-UCO") {
            return [
                'tree_photos',
                'branch_photos',
                'fruit_photos'
            ];
        }
        return [
            'tree_photos',
            'branch_photos',
            'fruit_photos',
            'leaf_photos',
            'endocarp_photos'
        ];
    }

    const currentImages = api[currentTab] || [];
    const totalImages = currentImages.length;

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev + 1) % totalImages);
    };

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
    };

    return (
        <>
            <Text style={styles.paragraphTitle}>{t('images')}</Text>
            <View style={styles.card}>
                {/* Tab Section */}
                <View style={styles.tabContainer}>
                    {tabs().map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, currentTab === tab && styles.activeTab]}
                            onPress={() => {
                                setCurrentTab(tab);
                                setCurrentImage(0); // Reset to first image when changing tab
                            }}
                        >
                            <Text style={styles.tabText}>{t(tab.split('_')[0])}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Image Display Section */}
                <View style={styles.imageContainer}>
                    {totalImages > 0 ? (
                        <Image
                            source={{ uri: currentImages[currentImage] }}
                            style={{ ...styles.image, height: 200 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text>{t('noImageAvailable')}</Text>
                    )}
                </View>
                
                {/* Navigation Buttons */}
                {totalImages > 0 && (
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity onPress={handlePrevImage} disabled={totalImages === 0}>
                            <Icon name="arrow-back" />
                        </TouchableOpacity>
                        <Text>{`${currentImage + 1} / ${totalImages}`}</Text>
                        <TouchableOpacity onPress={handleNextImage} disabled={totalImages === 0}>
                            <Icon name="arrow-forward" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = {
    card: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: 'darkgreen',
        borderRadius: 10,
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
        padding: "2%"
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap', // Aggiunto per permettere il wrapping
        marginBottom: 10,
    },
    tab: {
        margin: 5,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'darkgreen',
    },
    tabText: {
        fontSize: 16,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navigationText: {
        fontSize: 16,
        color: 'blue',
    },
    paragraphTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: '5%',
        fontWeight: 'bold',
        color: '#a87c04',
    },
};
