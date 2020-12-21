import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import { responsiveHeight, responsiveScreenWidth, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const MovieList = (props) => {

    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <Touchable style={styles.touchable} onPress={props.onSelect}>
            <View style={styles.movieContainer}>
                <Image
                    resizeMode='stretch'
                    style={styles.image}
                    source={{ uri: props.image }} />
                <View style={styles.movieDetails}>
                    <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                    <Text style={styles.ratings} >
                        <Ionicons name="ios-star" size={14} color={props.ratings >= 7 ? 'green' : props.ratings >= 5 ? 'orange' : 'red'} />
                        &nbsp;{props.ratings}
                    </Text>
                </View>
            </View>
        </Touchable>
    )
}


const styles = StyleSheet.create({
    movieContainer: {
        marginHorizontal: 5,
        height: 180,
        width: responsiveScreenWidth(30),
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        // borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 140
    },
    movieDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: Colors.light
    },
    title: {
        color: Colors.dark,
        width: '65%',
        fontFamily: 'Poppins'
    },
    ratings: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: Colors.dark
    },
});


export default MovieList;
