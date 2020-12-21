import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveScreenWidth, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Colors from '../constants/Colors';

const HomeScreen = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subcontainer}>
                <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Timer')}>
                    <Image style={styles.previewImg} resizeMode='cover' source={require('../../assets/images/clock.png')} />
                    <Text style={styles.projectText} >Countdown Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Quiz')}>
                    <Image style={styles.previewImg} resizeMode='stretch' source={require('../../assets/images/Quiz.png')} />
                    <Text style={styles.projectText} >Quiz App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Movies')}>
                    <Image style={styles.previewImg} resizeMode='stretch' source={require('../../assets/images/movie-banner.jpeg')} />
                    <Text style={styles.projectText} >Movies App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Recipe')}>
                    <Image style={styles.previewImg} resizeMode='stretch' source={require('../../assets/images/Recipe.jpg')} />
                    <Text style={styles.projectText} >Recipe App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('Github Profile')}>
                    <Image style={styles.previewImg} resizeMode='cover' source={require('../../assets/images/github-logo.png')} />
                    <Text style={styles.projectText} >Github Profile App</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.light
    },
    subcontainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        justifyContent: 'space-between',
        backgroundColor: Colors.light
    },
    card: {
        width: responsiveScreenWidth(45),
        height: 200,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        // borderRadius: 5,
        //  overflow: 'hidden',
        alignItems: 'center'
    },
    previewImg: {
        width: '100%',
        height: '75%',
    },
    projectText: {
        lineHeight: 50,
        fontSize: 16,
        fontFamily: 'Poppins-bold'
    }
})
export default HomeScreen;
