import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';

const TakeQuiz = () => {
    const quizCollRef = collection(db, 'quiz-app');
    const [quizTypes, setQuizTypes] = useState([]);
    const [selectedQuizType, setSelectedQuizType] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const getQuiz = async () => {
            const data = await getDocs(quizCollRef);
            const types = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setQuizTypes(types);
        };
        getQuiz();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const handleAnswerButtonClick = (answer) => {
        const isCorrect = answer === data[currentQuestion].answer;
        const points = isCorrect ? data[currentQuestion].points : 0;
        setScore((prevScore) => prevScore + points);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    const handleQuizTypeChange = async (event) => {
        const selectedTypeId = event.target.value; // Use ID instead of object
        setSelectedQuizType(selectedTypeId); // Set ID as selectedQuizType
        const typeDocRef = doc(db, 'quiz-app', selectedTypeId); // Get document reference for selected quiz type ID
        console.log(selectedTypeId)
        const questRef = collection(db, `quiz-app/${selectedTypeId}/questions`)
        const quest = await getDocs(questRef)
        setQuizQuestions(quest.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(quest.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Quiz Component</h1>
                <label htmlFor="quizTypeSelect" className="block font-medium mb-2">Select Quiz Type:</label>
                <select
                    id="quizTypeSelect"
                    value={selectedQuizType}
                    onChange={handleQuizTypeChange}
                    className="border rounded p-2 w-full mb-4"
                >
                    <option value="">Select Quiz Type</option>
                    {quizTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {quizQuestions.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Questions {`${currentQuestion + 1}/${quizQuestions.length}`}</h2>
                        {quizQuestions.map((question, index) => (
                            <div key={index} className="bg-white shadow rounded p-4 mb-4">
                                <h3 className="text-xl font-bold mb-2">{question.question}</h3>
                                <p className="mb-2">{question.option1}</p>
                                <p className="mb-2">{question.option1}</p>
                                <p className="mb-2">{question.option1}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default TakeQuiz;
