import React, { useState } from 'react';

const QuizComponent = () => {
    const [selectedQuizType, setSelectedQuizType] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);

    const quizTypes = [
        {
            name: 'Maths',
            questions: [
                {
                    question: 'What is 2+2?',
                    answer: '4',
                },
                {
                    question: 'What is the square root of 64?',
                    answer: '8',
                },
            ],
        },
        {
            name: 'Science',
            questions: [
                {
                    question: 'What is the largest planet in our solar system?',
                    answer: 'Jupiter',
                },
                {
                    question: 'What is the process by which plants convert sunlight into food?',
                    answer: 'Photosynthesis',
                },
            ],
        },
        {
            name: 'History',
            questions: [
                {
                    question: 'Who was the first president of the United States?',
                    answer: 'George Washington',
                },
                {
                    question: 'What was the main cause of World War II?',
                    answer: 'The invasion of Poland by Nazi Germany',
                },
            ],
        },
    ];

    const handleQuizTypeChange = (event) => {
        const selectedType = event.target.value;
        const selectedQuestions = quizTypes.find((type) => type.name === selectedType).questions;
        setSelectedQuizType(selectedType);
        setQuizQuestions(selectedQuestions);
    };

    return (
        <div>
            <h1>Quiz Component</h1>
            <label htmlFor="quizTypeSelect">Select Quiz Type: </label>
            <select id="quizTypeSelect" value={selectedQuizType} onChange={handleQuizTypeChange}>
                <option value="">Select Quiz Type</option>
                {quizTypes.map((type) => (
                    <option key={type.name} value={type.name}>
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

export default QuizComponent;







