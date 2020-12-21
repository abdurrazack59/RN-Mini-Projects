import React from 'react'
import { View, Text, StyleSheet, Image, ImagePropTypes } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";


const Loading = (props) => {
    return (
        // <AnimatedLoader
        //     visible={true}
        //     overlayColor="transparent"
        //     source={require("./loader.json")}
        //     animationStyle={styles.lottie}   
        //     speed={1.5}
        // />
        <View style={{ ...props.style }}>
            <Image source={require('./animation_500_kisw0ytj.gif')} resizeMode={'stretch'} style={styles.lottie} />
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 150,
        height: 150
    }
});

export default Loading;
