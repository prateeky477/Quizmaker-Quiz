import React, { useState } from 'react';
import { db } from '../config/firebase';
import { auth } from "../config/firebase";

import { addDoc, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CreateQuest from './CreateQuest';
const CreateTest = () => {
    const [description, setDescription] = useState('');
    const [quizName, setQuizName] = useState('');
    const [timeLimit, setTimeLimit] = useState(1);
    const [marks, setMarks] = useState(1);
    const [collId, setCollID] = useState(0)
    const [isType, setType] = useState(false)
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUser(auth?.currentUser?.email)
            const quizDocRef = await addDoc(collection(db, 'quiz-app'), {
                name: quizName,
                desc: description,
                time: timeLimit,
                points: marks,
                user: user
            });
            setType(true)


            setCollID(quizDocRef.id)
            alert('Quiz created successfully!');
            setQuizName('');
            setDescription('');
            setTimeLimit(0);
            setMarks(0);
            // navigate('/create-quest')
        } catch (error) {
            console.error(error);
        }
        // CreateQuest(collId)

    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {
                !isType ?
                    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="quiz-name">
                                    Quiz Name
                                </label>
                                <input
                                    required
                                    id="quiz-name"
                                    type="text"
                                    placeholder="Enter quiz name"
                                    className="appearance-none border rounded w-full sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={quizName}
                                    onChange={(e) => setQuizName(e.target.value)}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    required
                                    placeholder="Enter description"
                                    className="appearance-none border rounded w-full sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="time-limit">
                                    Time Limit (for each question in minutes)
                                </label>
                                <input
                                    required
                                    id="time-limit"
                                    type="number"
                                    placeholder="Enter time limit "
                                    className="appearance-none border rounded w-full sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <div className="">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="marks">
                                        Marks (for each question)
                                    </label>
                                    <input
                                        required
                                        id="marks"
                                        type="number"
                                        placeholder="Enter marks"
                                        className="appearance-none border rounded w-full sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={marks}
                                        onChange={(e) => setMarks(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create Quiz
                                </button>
                            </div>
                            {!isType ? ' ✔' : ""}
                        </div>
                    </form>
                    : ""
            }
            {isType ? <CreateQuest collId={collId} /> : ""}
        </motion.div>

    )
}

export default CreateTest
