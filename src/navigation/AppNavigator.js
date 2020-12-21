import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CountdownTimerScreen from "../screens/CountdownTimerScreen";
import QuizAppScreen from "../screens/QuizAppScreen";
import MoviesScreen from '../screens/MoviesScreen';
import MoviesDetailsScreen from '../screens/MovieDetailsScreen';
import Colors from '../constants/Colors';
import RecipeScreen from '../screens/RecipeScreen';
import RecipeDetailScreen from '../component/RecipeDetail';
import GithubProfileScreen from '../screens/GithubProfileScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {

    const defaultHeaderStyle = {
        headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: 'transparent'
        },
        headerTintColor: Colors.dark,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: 'Poppins-bold',
        },
    }

    const movieDetailHeader = {
        headerStyle: {
            backgroundColor: Colors.dark,
            shadowColor: 'transparent'
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: 'Poppins-bold',
        },
    }

    const githubProfileHeader = {
        headerStyle: {
            backgroundColor: Colors.voilet,
            shadowColor: 'transparent'
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: 'Poppins-bold',
        },
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={defaultHeaderStyle}

                />
                <Stack.Screen
                    name="Timer"
                    component={CountdownTimerScreen}
                    options={defaultHeaderStyle}

                />
                <Stack.Screen
                    name="Quiz"
                    component={QuizAppScreen}
                    options={defaultHeaderStyle}

                />
                <Stack.Screen
                    name="Movies"
                    component={MoviesScreen}
                    options={defaultHeaderStyle}
                />
                <Stack.Screen
                    name="Movie Detail"
                    component={MoviesDetailsScreen}
                    options={movieDetailHeader}
                />
                <Stack.Screen
                    name="Recipe"
                    component={RecipeScreen}
                    options={defaultHeaderStyle}
                />
                <Stack.Screen
                    name="Recipe detail"
                    component={RecipeDetailScreen}
                    options={defaultHeaderStyle}
                />
                <Stack.Screen
                    name="Github Profile"
                    component={GithubProfileScreen}
                    options={githubProfileHeader}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
