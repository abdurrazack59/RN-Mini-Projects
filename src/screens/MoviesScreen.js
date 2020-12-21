import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import MovieList from '../component/MovieList';

const MoviesScreen = (props) => {

    const [page, setpage] = useState(1);
    const [allMovies, setAllMovies] = useState([]);
    const [error, setError] = useState('');
    const [isSearchMovie, setIsSearchMovie] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const searchMovieHandler = async (inputText) => {
        try {
            const resp = await fetch(SEARCHAPI + inputText);
            const respData = await resp.json();
            if (inputText.length > 0) {
                setIsSearchMovie(true);
                respData.results.forEach(movie => {
                    if (!movie.poster_path) {
                        movie.poster_path = IMGPATH.concat(movie.backdrop_path);
                    } else {
                        movie.poster_path = IMGPATH.concat(movie.poster_path);
                    }
                });
                setAllMovies(respData.results);
                return;
            }
            setIsSearchMovie(false);
            getAllMovies();
            //  console.log(respData.results);
        } catch (error) {
            console.warn(error);
            setError(error.message)
        }
    };

    useEffect(() => {
        console.log('useeffect callback');
        getAllMovies();
        // renderFooter();
        return () => {
            console.log('clean up movie screen');
        };
    }, []);

    const getAllMovies = async () => {
        try {
            setIsLoading(true);
            const resp = await fetch(APIURL + page);
            if (!resp.ok) {
                throw new Error("Something went wrong");
            }
            const respData = await resp.json();
            setIsLoading(false);
            respData.results.forEach(movie => {
                if (!movie.poster_path) {
                    movie.poster_path = IMGPATH.concat(movie.backdrop_path);
                } else {
                    movie.poster_path = IMGPATH.concat(movie.poster_path);
                }
            });
            console.log(respData.results);
            setAllMovies([...allMovies, ...respData.results]);
        } catch (error) {
            setIsLoading(false);
            console.warn(error);
            setError(error.message);
        }
    };

    const loadMoreMovies = useCallback(() => {
        if (isSearchMovie) {
            return;
        }
        console.log('page is' + page);
        setpage(prevState => prevState + 1);
        getAllMovies();
    }, [setpage, getAllMovies]);

    // const renderFooter = () => {
    //     return (
    //         //Footer View with Load More button
    //         <View style={styles.footer}>
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 onPress={getAllMovies}
    //                 //On Click of button load more data
    //                 style={styles.loadMoreBtn}>
    //                 <Text style={styles.btnText}>Load More</Text>
    //                 {loading ? (
    //                     <ActivityIndicator
    //                         color="white"
    //                         style={{ marginLeft: 8 }} />
    //                 ) : null}
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{error}</Text>
            </View>
        )
    }


    const movieListHandler = (movieDetail) => {
        props.navigation.navigate('Movie Detail', {
            movieDetail: movieDetail
        })
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TextInput
                placeholder='Search Movie Here..'
                placeholderTextColor='gray'
                onChangeText={searchMovieHandler}
                style={styles.input}
            />
            <View style={styles.movieType}>
                <Text style={styles.movieTypeLabel}>All Movies</Text>
                <Text style={styles.moreMovie} >See All</Text>
            </View>
            <FlatList
                data={allMovies}
                onEndReached={loadMoreMovies}
                keyExtractor={(item, index) => String(index)}
                numColumns={3}
                columnWrapperStyle={styles.row}
                enableEmptySections={true}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => isLoading && <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} size={'small'} color={Colors.danger} />}
                renderItem={itemData =>
                    <MovieList
                        onSelect={movieListHandler.bind(this, itemData.item)}
                        image={itemData.item.poster_path}
                        title={itemData.item.original_title}
                        ratings={itemData.item.vote_average}
                    />
                }
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        borderColor: Colors.light,
        borderWidth: 1,
        margin: 15,
        color: Colors.dark,
        backgroundColor: Colors.light,
        borderRadius: 5,
        fontFamily: 'Poppins'
    },
    movieType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    movieTypeLabel: {
        fontSize: 28,
        fontFamily: 'Poppins-bold',
        color: Colors.secondary,
    },
    moreMovie: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: 'Poppins-bold'

    },
    row: {
        flex: 1,
        margin: 5
    },

    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },

})



export default MoviesScreen;
