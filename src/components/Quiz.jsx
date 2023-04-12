import { useState, useEffect } from "react";
import data from "./data";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState();

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

    return (
        <div className="container mx-auto py-10">
            {showScore ? (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Quiz Results</h1>
                    <p className="text-xl mb-4">
                        You scored {score} out of {data.length * 40} points.
                    </p>
                    <p className="text-lg mb-4">Time remaining: {timer} seconds</p>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Question {currentQuestion + 1}
                    </h1>
                    <p className="text-xl mb-4">{data[currentQuestion].question}</p>
                    <div className="flex justify-center">
                        {data[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                                onClick={() => handleAnswerButtonClick(option)}
                            >
                                {option}
                            </button>
                        ))}</div>
                    <p className="text-lg mt-8">Time remaining: {timer} seconds</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
