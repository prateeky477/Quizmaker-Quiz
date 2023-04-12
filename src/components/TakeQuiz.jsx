import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const TakeQuiz = () => {
    const quizCollRef = collection(db, 'quiz-app');
    const [quizTypes, setQuizTypes] = useState([]);
    const [selectedQuizType, setSelectedQuizType] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        const getQuiz = async () => {
            const data = await getDocs(quizCollRef);
            const types = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setQuizTypes(types);
        };
        getQuiz();
    }, []);

    const handleQuizTypeChange = async (event) => {
        const selectedType = event.target.value;
        setSelectedQuizType(selectedType);
        const typeDocRef = doc(db, 'quiz-app', selectedType.id);
        const typeDocSnap = await getDoc(typeDocRef);
        if (typeDocSnap.exists()) {
            const selectedQuestions = typeDocSnap.data().questions;
            setQuizQuestions(selectedQuestions);
        }
    };

    return (
        <div>
            <h1>Quiz Component</h1>
            <label htmlFor="quizTypeSelect">Select Quiz Type: </label>
            <select id="quizTypeSelect" value={selectedQuizType} onChange={handleQuizTypeChange}>
                <option value="">Select Quiz Type</option>
                {quizTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                ))}
            </select>
            {quizQuestions.length > 0 && (
                <>
                    <h2>{selectedQuizType} Quiz Questions</h2>
                    {quizQuestions.map((question, index) => (
                        <div key={index}>
                            <h3>{question.question}</h3>
                            <p>{question.answer}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
export default TakeQuiz;
