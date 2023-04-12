import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';

const CreateTest = () => {
    const [description, setDescription] = useState('');
    const [quizName, setQuizName] = useState('');
    const [timeLimit, setTimeLimit] = useState(0);
    const [marks, setMarks] = useState(0);

    const [question, setQuestion] = useState("")
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [ans, setAns] = useState("")

    const [collId, setCollID] = useState(0)
    const [subcollId, setSubCollID] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const quizDocRef = await addDoc(collection(db, 'quiz-app'), {
                name: quizName,
                desc: description,
                time: timeLimit,
                points: marks,
            });

            setCollID(quizDocRef.id)
            // const quesRef = collection(db, `quiz-app/${quizDocRef.id}/questions`);
            // setSubCollID(quesRef.id)
            alert('Quiz created successfully!');
            setQuizName('');
            setDescription('');
            setTimeLimit(0);
            setMarks(0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitQues = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'quiz-app', `${collId}`, 'questions'), {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                currectans: ans
            });
            // alert('Question created successfully!');
            setQuestion('');
            setoption1('');
            setoption2('');
            setoption3('');
            setAns('')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Time Limit (minutes)"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                />
                <button type="submit">Create Quiz</button>
            </form>
            <form>
                <input
                    type="text"
                    placeholder="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="option1"
                    value={option1}
                    onChange={(e) => setoption1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="option2"
                    value={option2}
                    onChange={(e) => setoption2(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="option3"
                    value={option3}
                    onChange={(e) => setoption3(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ans"
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                />
                <button type="submit" onClick={handleSubmitQues}>Submit Question</button>

            </form>
        </div>
    );
};

export default CreateTest;
