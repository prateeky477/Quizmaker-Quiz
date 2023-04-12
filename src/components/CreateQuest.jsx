import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
const CreateQuest = ({ collId }) => {
    const [question, setQuestion] = useState("")
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [ans, setAns] = useState("")

    const [quizList, setQuizList] = useState([])
    const quizCollRef = collection(db, 'quiz-app')
    const questionsRef = collection(db, `quiz-app/${collId}/questions`)
    const getQuiz = async () => {
        const data = await getDocs(quizCollRef)
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const questions = await getDocs(questionsRef)
        console.log(questions.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const handleSubmitQues = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, `quiz-app/${collId}/questions`), {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                currectans: ans
            });
            alert('Question created successfully!');
            setQuestion('');
            setoption1('');
            setoption2('');
            setoption3('');
            setAns('')
            getQuiz()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form className='mx-auto max-w-2xl'>
                <div className='mb-4'>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="">
                        Question
                    </label>
                    <textarea
                        id=''
                        className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

                        type="text"
                        placeholder=""
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className="ml-10 block text-gray-700 font-bold mb-2" htmlFor="">
                        option1
                    </label>
                    <textarea
                        className='ml-10 appearance-none border rounded w-80% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id=''
                        type="text"
                        placeholder=""
                        value={option1}
                        onChange={(e) => setoption1(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className=" ml-10 block text-gray-700 font-bold mb-2" htmlFor="">
                        option2
                    </label>
                    <textarea
                        className='ml-10 appearance-none border rounded w-80% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id=''
                        type="text"
                        placeholder=""
                        value={option2}
                        onChange={(e) => setoption2(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className=" ml-10 block text-gray-700 font-bold mb-2" htmlFor="">
                        option3
                    </label>
                    <textarea
                        className='ml-10 appearance-none border rounded w-80% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id=''
                        type="text"
                        placeholder=""
                        value={option3}
                        onChange={(e) => setoption3(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className="ml-10 block text-gray-700 font-bold mb-2" htmlFor="">
                        Answer
                    </label>
                    <textarea
                        id=''
                        className='ml-10 appearance-none border rounded w-80% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        placeholder=""
                        value={ans} onChange={(e) => setAns(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={handleSubmitQues}>Submit Question</button>
                </div>
            </form>
            <div>

            </div>
        </div>

    );
};

export default CreateQuest;
