import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, FlatList } from 'react-native'
import Colors from '../constants/Colors';
import { WebView } from 'react-native-webview'


const deviceWidth = Dimensions.get('window').width;

const MovieDetailsScreen = (props) => {


    const movieDetail = props.route.params.movieDetail;
    const [movieData, setMovieData] = useState([]);
    const embedYoutubePath = 'https://www.youtube.com/embed/';


    const APIURL = `https://api.themoviedb.org/3/movie/${movieDetail.id}/videos?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`;

    const getMovieTrailer = useCallback(async () => {
        try {
            const resp = await fetch(APIURL);
            console.log(APIURL);
            if (!resp.ok) {
                throw new Error('Something went wrong')
            }
            const respData = await resp.json();
            respData.results.forEach(movie => {
                movie.key = embedYoutubePath.concat(movie.key);
            });
            console.log(respData.results);
            setMovieData(respData.results);
        } catch (error) {
            console.error(error);
        }
    }, [setMovieData]);

    useEffect(() => {
        getMovieTrailer();
        console.log(movieData);
        return () => {
            console.log('clean up movie details');
        }
    }, [getMovieTrailer]);

    const onCloseofWebview = (message) => {
        console.log(message);
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.MainContainer}>
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
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <View style={styles.synopsis}>
                    <Text style={styles.title}>SYNOPSIS</Text>
                    <Text style={styles.movieDescription}>
                        {movieDetail.overview}
                    </Text>
                </View>
                <Text style={{ ...styles.title, marginHorizontal: 15 }}>TRAILER & CLIPS</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={movieData}
                    keyExtractor={(item, i) => String(i)}
                    renderItem={itemData =>
                        <View style={styles.card}>
                            <WebView
                                style={{ borderRadius: 10 }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                allowsFullscreenVideo={true}
                                source={{ uri: itemData.item.key }}
                            />
                        </View>
                    }
                />
                <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                    <Text style={styles.title}>OTHER DETAILS</Text>
                    <Text style={styles.subTitle}>Ratings : <Text style={styles.titleValue}>{movieDetail.vote_average}</Text></Text>
                    <Text style={styles.subTitle}>Release Date : <Text style={styles.titleValue}>{movieDetail.release_date}</Text></Text>
                </View>
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
        marginHorizontal: 15,
        marginTop: 15
    },
    card: {
        height: 140,
        width: deviceWidth / 1.818,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: 10,
    },
})

export default MovieDetailsScreen;
