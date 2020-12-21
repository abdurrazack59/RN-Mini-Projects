import React, { useEffect, useState, } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Linking } from "react-native";
import Colors from "../constants/Colors";
import { WebView } from 'react-native-webview'

export default function RecipeDetail(props) {

    const recipeDetail = props.data;

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    console.log(recipeDetail);

    let ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (recipeDetail["strIngredient" + i]) {
            ingredients.push(
                `${recipeDetail["strIngredient" + i]} - ${recipeDetail["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    console.log(ingredients);

    const playRecipeVideoHandler = (videoUrl) => {
        console.log(videoUrl);
        if (!videoUrl) {
            console.log('NO YOUTUBE VIDEO');
            return;
        }
        setIsVideoPlaying(true);
    };

    const openLinkHandler = (sourceUrl) => {
        console.log(sourceUrl);
        Linking.canOpenURL(sourceUrl).then(supported => {
            if (supported) {
                Linking.openURL(sourceUrl);
            } else {
                console.log("Don't know how to open URI: " + sourceUrl);
            }
        });
    };

    useEffect(() => {
        return () => {
            console.log('cleanup recipe details');
            setIsVideoPlaying(false);
        }
    }, [setIsVideoPlaying])


    return (
        <View style={{ flex: 1, }}>
            {/* <YourOwnComponent /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.MainContainer}>
                <View>
                    {!isVideoPlaying && <Image style={styles.image} resizeMode='stretch' source={{ uri: recipeDetail.strMealThumb }} />}
                    {!isVideoPlaying && <Text onPress={playRecipeVideoHandler.bind(this, recipeDetail.strYoutube)} style={styles.playBtn}>Play Video</Text>}
                    {isVideoPlaying && <WebView
                        style={{ width: '100%', height: 300 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        allowsInlineMediaPlayback={true}
                        //  mediaPlaybackRequiresUserAction={false}
                        source={{ uri: recipeDetail.strYoutube.replace('watch?v=', 'embed/') }}
                    // source={{
                    //     html: '<video style="width: 100%; height: 100%" playsinline controls autoplay  src="https://www.w3schools.com/html/mov_bbb.mp4" ></video>'
                    // }}
                    />}
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.recipeTitle}>{recipeDetail.strMeal}</Text>
                    <Text style={styles.title}>RECIPE</Text>
                    <Text style={styles.recipeDescription}>
                        {recipeDetail.strInstructions}
                    </Text>
                    <Text style={styles.title}>INGREDIENTS</Text>
                    {ingredients.map((item, index) => {
                        return <Text key={index} style={styles.titleValue}><Text style={{ color: Colors.secondary }}>&gt;</Text>   {item}</Text>
                    })}
                    <Text style={styles.title}>SOURCE : <Text onPress={openLinkHandler.bind(this, recipeDetail.strSource)} style={{ color: Colors.primary }}>{recipeDetail.strSource}</Text></Text>

                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: Colors.white
    },
    image: {
        width: '100%',
        height: 300
    },
    playBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        color: Colors.light,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: Colors.crimson,
        fontFamily: 'Poppins-bold'
    },
    detailsContainer: {
        margin: 15,
    },
    recipeDescription: {
        color: Colors.dark,
        fontFamily: 'Poppins-bold'
    },
    title: {
        marginVertical: 15,
        fontSize: 16,
        color: Colors.crimson,
        fontFamily: 'Poppins-bold'

    },
    recipeTitle: {
        fontSize: 36,
        color: Colors.secondary,
        fontFamily: 'Poppins-bold',
    },
    titleValue: {
        color: Colors.dark,
        fontFamily: 'Poppins-bold'

    }
});