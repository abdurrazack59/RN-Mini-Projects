import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import Colors from '../constants/Colors'

const MovieDetailsScreen = (props) => {

    const movieDetail = props.route.params.movieDetail;

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} style={styles.MainContainer}>
            <View style={styles.imageContainer} >
                <Image style={styles.image} resizeMode='stretch' source={{ uri: movieDetail.poster_path }} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.Movietitle}>{movieDetail.title.toUpperCase()}</Text>
                <View style={styles.movieGenre}>
                    <Text style={styles.movieGenreText}>Adventure</Text>
                    <Text style={styles.movieGenreText}>Family</Text>
                    <Text style={styles.movieGenreText}>Fantasy</Text>
                </View>
            </View>
            <View style={styles.synopsis}>
                <Text style={styles.title}>SYNOPSIS</Text>
                <Text style={styles.movieDescription}>
                    {movieDetail.overview}
                </Text>
                <Text style={styles.title}>OTHER DETAILS</Text>
                <Text style={styles.subTitle}>Ratings : <Text style={styles.titleValue}>{movieDetail.vote_average}</Text></Text>
                <Text style={styles.subTitle}>Release Date : <Text style={styles.titleValue}>{movieDetail.release_date}</Text></Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: Colors.dark,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 300,
        marginVertical: 15
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    detailsContainer: {
        marginHorizontal: 15,
        alignItems: 'center'
    },
    movieDescription: {
        fontSize: 14,
        color: '#c2cad0',
        fontFamily: 'Poppins-bold'
    },
    title: {
        marginVertical: 15,
        fontSize: 16,
        color: Colors.medium,
        fontFamily: 'Poppins-bold'

    },
    Movietitle: {
        fontSize: 36,
        textAlign: 'center',
        color: Colors.secondary,
        fontFamily: 'Poppins-bold',
    },
    movieGenre: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    movieGenreText: {
        marginHorizontal: 5,
        color: Colors.light,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Colors.danger,
        fontFamily: 'Poppins-bold',
        fontSize: 10,
        borderRadius: 20,
        marginTop: 8
    },
    subTitle: {
        marginVertical: 3,
        color: Colors.crimson,
        fontFamily: 'Poppins-bold'


    },
    titleValue: {
        color: '#c2cad0',
        fontFamily: 'Poppins-bold'

    },
    synopsis: {
        margin: 15
    },
})

export default MovieDetailsScreen;
