import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const CreateQuest = ({ collId }) => {
    const [question, setQuestion] = useState("")
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [ans, setAns] = useState("")
    const [updatedquestion, setUpdatedQuestion] = useState("")
    const [updatedoption1, setUpdatedoption1] = useState("")
    const [updatedoption2, setUpdatedoption2] = useState("")
    const [updatedoption3, setUpdatedoption3] = useState("")
    const [updatedans, setUpdatedAns] = useState("")
    const [isUpdate, setUpdate] = useState(false)
    const [quizList, setQuizList] = useState([])
    const quizCollRef = collection(db, 'quiz-app')
    const questionsRef = collection(db, `quiz-app/${collId}/questions`)
    const getQuiz = async () => {
        const data = await getDocs(quizCollRef)
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const questions = await getDocs(questionsRef)
        setQuizList(questions.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(questions.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    const upDateQuestion = async (id) => {
        setUpdate(true)
        const handleUpdate = () => { }
        const queDoc = doc(db, "quiz-app", id)
        await updateDoc(queDoc, { question: updatedquestion, option1: updatedoption1, option2: updatedoption2, option3: updatedoption3, correctans: updatedans })
    }

    const deleteQuestion = async (id) => {
        const queDoc = doc(db, `quiz-app/${collId}/questions`, id)
        await deleteDoc(queDoc)

    }
    const handleSubmitQues = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, `quiz-app/${collId}/questions`), {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                correctans: ans
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

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, `quiz-app/${collId}/questions`), {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                correctans: ans
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
        naviagte = useNavigate()
        naviagte('/')
    }


    return (
        <div>
            {!isUpdate && (
                <div className="flex-col grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {quizList.map((que) => {
                        return (
                            <div key={que.id} className="bg-white rounded-lg shadow-lg p-6">
                                <h1 className="text-lg font-bold mb-2">{que.question}</h1>
                                <ul className="list-disc list-inside">
                                    <li>{que.option1}</li>
                                    <li>{que.option2}</li>
                                    <li>{que.option3}</li>
                                </ul>
                                <p className="text-sm font-medium mt-2">Correct Answer: {que.correctans}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => { upDateQuestion(que.id) }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deleteQuestion(que.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* <div>
                {isUpdate && <form>
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
                            onChange={(e) => setUpdatedQuestion(e.target.value)}
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
                            onChange={(e) => setUpdatedoption1(e.target.value)}
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
                            onChange={(e) => setUpdatedoption2(e.target.value)}
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
                            onChange={(e) => setUpdatedoption3(e.target.value)}
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
                            value={ans} onChange={(e) => setUpdatedAns(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={handleSubmitQues}>Update</button>
                    </div>
                </form>}
            </div> */}

            <form className='mx-auto max-w-2xl'>
                <div className='mb-4'>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="">
                        Question
                    </label>
                    <textarea
                        id=''
                        className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                    <button onClick={handleFinalSubmit}>Submit </button>
                </div>
            </form>

        </div>

    );
};

export default CreateQuest;
