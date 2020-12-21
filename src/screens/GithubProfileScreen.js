import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const GithubProfileScreen = () => {

    const [textInput, setTextInput] = useState('');
    const [user, setUser] = useState('');

    const APIURL = "https://api.github.com/users/";

    useEffect(() => {
        getUser('florinpop17');
    }, [getUser]);

    const getUser = async (username) => {
        const resp = await fetch(APIURL + username);
        if (!resp.ok) {
            throw new Error('Something went wrong');
        }
        const respData = await resp.json();
        console.log(respData);
        setUser(respData);
    }

    const getUserByName = (username) => {
        setTextInput(null);
        getUser(username);
    };


    return (
        <View style={styles.screen}>
            <TextInput
                // onKeyPress={({ nativeEvent }) => {
                //     nativeEvent.key === 'Backspace' ? setRecipeData(null) : ''
                // }}
                onSubmitEditing={({ nativeEvent }) => {
                    getUserByName(nativeEvent.text)
                }}
                returnKeyType={'search'}
                placeholder='Search Recipe Here..'
                placeholderTextColor='gray'
                onChangeText={(text) => setTextInput(text)}
                value={textInput}
                style={styles.input}
            />
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <View style={styles.profileImg}>
                            <Image style={styles.image} resizeMode='stretch' source={{ uri: user.avatar_url }} />
                        </View>
                        <Text style={styles.desig}>{user.name}</Text>
                    </View>
                    <View style={styles.about}>
                        <Text style={styles.description}>{user.bio}</Text>
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.profileDetail}>
                            <Ionicons name="ios-heart" size={20} color={Colors.danger} />
                            <Text style={styles.label}>{user.followers}</Text>
                        </View>
                        <View style={styles.profileDetail}>
                            <Ionicons name="ios-eye" size={20} color={Colors.success} />
                            <Text style={styles.label}>{user.following}</Text>
                        </View>
                        <View style={styles.profileDetail}>
                            <Ionicons name="ios-book" size={20} color={Colors.secondary} />
                            <Text style={styles.label}>{user.public_repos}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#2E2A68',
        justifyContent: 'center'
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        borderColor: Colors.light,
        borderWidth: 1,
        margin: 25,
        color: 'gray',
        backgroundColor: Colors.light,
        borderRadius: 5,
        fontFamily: 'Poppins'
    },
    container: {
        marginHorizontal: 25
    },
    card: {
        padding: 30,
        width: '100%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        //  overflow: 'hidden',
        backgroundColor: '#800080',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        borderColor: '#2E2A68',
        borderWidth: 10,
        borderColor: '#2E2A68',
        borderRadius: 100,

    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    desig: {
        marginTop: 5,
        fontFamily: 'Poppins-bold',
        color: '#b7b6b6'
    },
    about: {
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.light,
        fontFamily: 'Poppins-bold'
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    profileDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Poppins-bold'
    },
    label: {
        fontSize: 14,
        color: Colors.light,
        marginHorizontal: 5,
        fontFamily: 'Poppins'
    }

})

export default GithubProfileScreen;
