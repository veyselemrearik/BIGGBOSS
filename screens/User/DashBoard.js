import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CategoryGrid from '../../components/CategoryGrid';
import UserMenu from '../../constants/UserMenu';
import ImageIcon from '../../components/ImageIcon';

const DashBoard = props => {
    const renderGridItem = (itemData) => {
        let imagePath;
        if (itemData.item.title === 'Personel Ekle') {
            imagePath = require('../../assets/images/category/catAddPersonel.png');
        }
        if (itemData.item.title === 'Personel Listesi') {
            imagePath = require('../../assets/images/category/catPersonelList.png');
        }
        if (itemData.item.title === 'Günlük Programınız') {
            imagePath = require('../../assets/images/category/catToday.png');
        }
        if (itemData.item.title === 'İş Listesi') {
            imagePath = require('../../assets/images/category/catWorkList.png');
        }
        if (itemData.item.title === 'İş Ekle') {
            imagePath = require('../../assets/images/category/catAddWork.png');
        }
        return (
            <CategoryGrid
                title={itemData.item.title}
                onSelect={() => {
                    props.navigation.navigate(itemData.item.screen)
                }}
                image={imagePath}
            />

        );
    };
    return (
        <View style={styles.body}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={UserMenu.CATEGORIES}
                numColumns={1}
                renderItem={renderGridItem}
            />
        </View>

    );
};

DashBoard.navigationOptions = navData => {
    return {
        headerTitle: 'Anasayfa',
        headerRight: () => <ImageIcon imagePath={require('../../assets/images/icons/profile.png')} goTo={()=>{
            navData.navigation.navigate('Myinfo')
        }      
        } />
    };

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width:32,
        height:32
    }
});

export default DashBoard;