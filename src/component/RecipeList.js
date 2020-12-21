import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../constants/Colors';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


const RecipeList = (props) => {

    const data = props.data;

    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }


    return (
        <View style={styles.recipeCard}>
            <Touchable onPress={props.onSelect}>
                <View style={styles.recipeCardBody}>
                    <View>
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={{ uri: data.strMealThumb }}
                        />
                        <View style={{ position: 'absolute', right: 0, top: 0, backgroundColor: Colors.dark, padding: 5, borderBottomLeftRadius: 5 }}>
                            <AirbnbRating
                                //  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                                selectedColor={Colors.crimson}
                                count={5}
                                defaultRating={Math.floor((Math.random() * 5) + 1)}
                                size={12}
                                showRating={false}
                                onFinishRating={ratingCompleted}
                            />
                        </View>
                    </View>

                    <View style={styles.recipeDetail}>
                        <Text style={{ ...styles.title, color: Colors.medium, fontSize: 12 }}>{data.strCategory.toUpperCase()}</Text>
                        <Text numberOfLines={1} style={{ ...styles.title, marginTop: 5 }}>{data.strMeal}</Text>
                        <View style={styles.detail3}>
                            <Text style={{ ...styles.title, color: Colors.medium, fontSize: 12, }}>
                                <Ionicons name="ios-timer" size={15} color={Colors.medium} />
                                &nbsp;{Math.floor((Math.random() * 40) + 20)} min
                            </Text>
                            <Text style={{ ...styles.title, color: Colors.medium, fontSize: 12, marginLeft: 30 }}>
                                <Ionicons name="ios-flag" size={15} color={Colors.medium} />
                                &nbsp;{data.strArea}
                            </Text>
                            <Text style={{ ...styles.title, color: Colors.medium, fontSize: 12, marginLeft: 30, }}>
                                <Ionicons name="ios-person" size={15} color={Colors.medium} />
                                &nbsp;{Math.floor((Math.random() * 10) + 1)} People
                            </Text>
                        </View>

                        {/* <Rating
                            type="star"
                            ratingCount={5}
                            ratingBackgroundColor='transparent'
                            imageSize={25}
                            style={{ paddingVertical: 10 }}
                            tintColor={Colors.light}
                        /> */}
                    </View>
                </View>
            </Touchable>
        </View>
    )
}


const styles = StyleSheet.create({
    recipeCard: {
        marginHorizontal: 15,
        borderRadius: 5,
        overflow: 'hidden'
    },
    recipeCardBody: {
        width: '100%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 175
    },
    recipeDetail: {
        paddingLeft: 15,
        paddingTop: 10,
        backgroundColor: Colors.white
    },
    detail3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    title: {
        color: Colors.dark,
        letterSpacing: 1,
        fontFamily: 'Poppins-bold',
    },

})

export default RecipeList;
