import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Colors from '../constants/Colors';


const QuizAppScreen = (props) => {

    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [score, setscore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const quizData = [
        {
            question: "What is the most used programming language in 2019?",
            correct: 'JavaScript',
            choices: [{ label: 'Java' }, { label: 'C' }, { label: 'Python' }, { label: 'JavaScript' },]
        },
        {
            question: "Who is the President of US?",
            correct: 'Donald Trump',
            choices: [{ label: 'Florin Pop' }, { label: 'Donald Trump' }, { label: 'Ivan Saldano' }, { label: 'Mihai Andrei' },]
        },
        {
            question: "What does HTML stand for?",
            correct: 'Hypertext Markup Language',
            choices: [{ label: 'Hypertext Markup Language' }, { label: 'Cascading Style Sheet' }, { label: 'Jason Object Notation' }, { label: 'Helicopters Terminals Motorboats Lamborginis' },]
        },
        {
            question: "What year was JavaScript launched?",
            correct: '1995',
            choices: [{ label: '1996' }, { label: '1995' }, { label: '1997' }, { label: '1998' },]
        }

    ];


    const submitAnswer = () => {
        console.log(correctAnswer.label);
        if (!correctAnswer) {
            Alert.alert('Select any 1 option');
            return;
        }
        if (currentQuiz < quizData.length) {
            setCurrentQuiz(prevState => prevState + 1);
        }
        if (correctAnswer.label === quizData[currentQuiz].correct) {
            setscore(prevState => prevState + 1);
        }
    };

    const resetBtn = () => {
        setCurrentQuiz(0)
        setscore(0);
    };

    return (
        <SafeAreaView style={styles.container}>
            {currentQuiz < quizData.length ? <ScrollView>
                <View style={styles.card}>
                    <View style={styles.quizContainer}>
                        <Text style={styles.question}>{quizData[currentQuiz].question}</Text>
                        <RadioButtonRN
                            initial={-1}
                            style={styles.radioBtn}
                            data={quizData[currentQuiz].choices}
                            selectedBtn={(value) => {
                                setCorrectAnswer(value);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.resultText}>Quiz Finished and the score is {score} out of {quizData.length} </Text>
                </View>
            }
            {currentQuiz < quizData.length ? <TouchableOpacity onPress={submitAnswer}>
                <View style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>SUBMIT</Text>
                </View>
            </TouchableOpacity>
                :
                <TouchableOpacity onPress={resetBtn}>
                    <View style={styles.submitBtn}>
                        <Text style={styles.submitBtnText}>RESTART</Text>
                    </View>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: '90%',
        maxHeight: 500,
        height: 400,
        margin: 20,
        marginTop: 100,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    quizContainer: {
        flex: 1,
        width: '100%',

    },
    question: {
        marginVertical: 10,
        marginTop: 40,
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
    },
    radioBtn: {
        margin: 15
    },
    submitBtn: {
        backgroundColor: Colors.crimson,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        fontFamily: 'Poppins'

    },
    submitBtnText: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: 'Poppins-bold'
    },
    resultText: {
        fontSize: 22,
        fontFamily: 'Poppins'

    }
});

export default QuizAppScreen;
