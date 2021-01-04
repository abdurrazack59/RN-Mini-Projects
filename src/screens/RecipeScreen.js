import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import Loading from '../component/loading/Loading';
import SkeletonLoading from '../component/loading/SkeletonLoading';

import RecipeList from '../component/RecipeList';
import RecipeDetail from '../component/RecipeDetail'
import recipeCategory from '../data/recipeCategory';
import { SimpleContent } from '../component/modals/SimpleContent';


// export const Loading = () => {
//     return (
//         <View style={{ flex: 1, marginTop: 100, alignItems: 'center' }}>
//             <ActivityIndicator color={Colors.crimson} size='large' />
//         </View>
//     )
// };

const RecipeScreen = (props) => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recipeData, setRecipeData] = useState(null);
    const [textInput, setTextInput] = useState(null);
    const [showRecipeDetail, setShowRecipeDetail] = useState(false);
    const [recipeDetailsData, setRecipeDetailsData] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);


    const modal = useRef();

    const RandomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php";
    const MealById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    const MealBySearch = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }


    useEffect(() => {
        getRandomMeal();
        setShowRecipeDetail(false);
        return () => {
            console.log('cleanup called');
        }
    }, [getRandomMeal, setShowRecipeDetail])

    const getRandomMeal = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsRefreshing(true);
            const resp = await fetch(RandomMealApi);
            if (!resp.ok) {
                throw new Error('Something Went wrong');
            }
            const respData = await resp.json();
            console.log(respData.meals);
            setRecipeData(respData.meals);
            setIsLoading(false);
            setIsRefreshing(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [error, isLoading, isRefreshing]);

    const getMealBySearch = useCallback(async (searchTerm) => {
        setTextInput(null);
        if (searchTerm.length === 0) {
            console.log('search empty');
            return;
        }
        try {
            setIsLoading(true);
            const resp = await fetch(MealBySearch + searchTerm);
            if (!resp.ok) {
                throw new Error('Something Went wrong');
            }
            const respData = await resp.json();
            console.log(respData.meals);
            setRecipeData(respData.meals);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsLoading(false);
        }
    }, [setError, setIsLoading]);


    const recipeDetailHandler = (recipeDetails) => {
        setRecipeDetailsData(recipeDetails);
        modal.current.open();
        // setShowRecipeDetail(true);
        // console.log('opening bottom sheet');
        // props.navigation.navigate('Recipe detail', {
        //     "RecipeDetail": recipeDetails
        // });
    };

    const selectCategoryHandler = (recipeCategory) => {
        console.log(recipeCategory);
        getMealBySearch(recipeCategory);
    }


    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{error}</Text>
            </View>
        )
    }

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator color={Colors.crimson} size='large' />
    //         </View>
    //     )
    // }




    return (
        <View style={styles.mainContainer}>
            <TextInput
                // onKeyPress={({ nativeEvent }) => {
                //     nativeEvent.key === 'Backspace' ? setRecipeData(null) : ''
                // }}
                onSubmitEditing={({ nativeEvent }) => {
                    getMealBySearch(nativeEvent.text)
                }}
                returnKeyType={'search'}
                placeholder='Search Recipe Here..'

                placeholderTextColor='gray'
                onChangeText={(text) => setTextInput(text)}
                value={textInput}
                style={styles.input}
            />
            <View style={styles.recipeHeader} >
                <Text style={styles.headerText}>FEATURED RECIPES</Text>
            </View>
            <View style={styles.recipeContainer}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={recipeCategory}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={itemData => (
                        <View style={styles.recipeList}>
                            <Touchable onPress={selectCategoryHandler.bind(this, itemData.item.strCategory)}>
                                <Image style={styles.recipeImg} source={{ uri: itemData.item.strMealThumb }} />
                            </Touchable>
                            <Text style={styles.recipeLabel}>{itemData.item.strCategory}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ ...styles.recipeHeader, marginTop: 10 }} >
                <Text style={styles.headerText}>LATEST</Text>
            </View>
            {!recipeData && !isLoading &&
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                    <Text style={{ fontFamily: 'Poppins-bold' }}>No Items Found...Search For Any Item Instead</Text>
                </View>
            }
            { isLoading ?
                // <Loading style={{ flex: 1, marginTop: 50, alignItems: 'center' }} />
                <SkeletonLoading />
                :
                <FlatList
                    data={recipeData}
                    onRefresh={getRandomMeal}
                    refreshing={isRefreshing}
                    keyExtractor={item => item.idMeal}
                    renderItem={itemData => (
                        <RecipeList data={itemData.item} onSelect={recipeDetailHandler.bind(this, itemData.item)} />
                    )}
                />}
            {/* Simple Modal */}
            <SimpleContent ref={modal} data={recipeDetailsData} >
                <RecipeDetail data={recipeDetailsData} />
            </SimpleContent>
        </View>

    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.light
    },
    input: {
        paddingHorizontal: 8,
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        borderColor: Colors.light,
        borderWidth: 1,
        margin: 15,
        color: Colors.dark,
        backgroundColor: Colors.white,
        borderRadius: 5,
        fontFamily: 'Poppins'
    },
    recipeHeader: {
        marginHorizontal: 15,
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins-bold',
        letterSpacing: 2,
        marginTop: 10,
        marginBottom: 8

    },
    recipeContainer: {
        height: 120,
        backgroundColor: Colors.white,
    },
    recipeList: {
        padding: 5,
        paddingTop: 15,
    },
    recipeImg: {
        height: 65,
        width: 65,
        borderRadius: 50
    },
    recipeLabel: {
        textAlign: 'center',
        marginTop: 10,
        color: Colors.medium,
        fontFamily: 'Poppins-bold'
    },

});

export default RecipeScreen;
