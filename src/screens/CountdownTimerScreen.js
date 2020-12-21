import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, } from 'react-native'

const CountdownTimerScreen = () => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const newYear = '1 Jan 2021';

    const startTimer = () => {
        const newYearDate = new Date(newYear);
        const currentDate = new Date();

        const totalSeconds = (newYearDate - currentDate) / 1000;
        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        setDays(formatDate(days));
        setHours(formatDate(hours));
        setMinutes(formatDate(minutes));
        setSeconds(formatDate(seconds));
    };

    const formatDate = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    useEffect(() => {
        const id = setInterval(startTimer, 1000);
        return () => {
            clearInterval(id);
        }
    }, []);




    return (
        <View style={styles.container}>

            <ImageBackground source={require('../../assets/images/snow.jpg')} resizeMode='cover' style={styles.bgImg}>
                <View style={styles.countdownContainer}>
                    <Text style={styles.timer}>{days}</Text>
                    <Text style={styles.timerLabel}>Days</Text>
                </View>
                <View style={styles.countdownContainer}>
                    <Text style={styles.timer}>{hours}</Text>
                    <Text style={styles.timerLabel}>Hours</Text>
                </View>
                <View style={styles.countdownContainer}>
                    <Text style={styles.timer}>{minutes}</Text>
                    <Text style={styles.timerLabel}>Minutes</Text>
                </View>
                <View style={styles.countdownContainer}>
                    <Text style={styles.timer}>{seconds}</Text>
                    <Text style={styles.timerLabel}>Seconds</Text>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
    },
    timer: {
        margin: 20,
        marginTop: 15,
        fontSize: 38,
        fontFamily: 'Poppins-bold'

    },
    timerLabel: {
        margin: 20,
        marginTop: 15,
        fontSize: 16,
        fontFamily: 'Poppins-bold'

    }
});

export default CountdownTimerScreen;
