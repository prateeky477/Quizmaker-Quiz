// import React, { useState } from 'react';
// import { db } from '../config/firebase';
// import { addDoc, collection } from 'firebase/firestore';

// const CreateTest = () => {
//     const [description, setDescription] = useState('');
//     const [quizName, setQuizName] = useState('');
//     const [timeLimit, setTimeLimit] = useState(0);
//     const [marks, setMarks] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const quizRef = collection(db, 'Quiz');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         setErrorMessage('');

//         try {
//             await addDoc(quizRef, {
//                 description: description,
//                 marks: marks,
//                 quizName: quizName,
//                 timeLimit: timeLimit
//             });
//             setDescription('');
//             setQuizName('');
//             setTimeLimit(0);
//             setMarks(0);
//         } catch (error) {
//             console.error(error);
//             setErrorMessage('Failed to create quiz');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     placeholder='Quiz Name'
//                     value={quizName}
//                     onChange={(e) => setQuizName(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     placeholder='Description'
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 />
//                 <input
//                     type='number'
//                     placeholder='Time Limit (in minutes)'
//                     value={timeLimit}
//                     onChange={(e) => setTimeLimit(parseInt(e.target.value))}
//                     required
//                 />
//                 <input
//                     type='number'
//                     placeholder='Total Marks'
//                     value={marks}
//                     onChange={(e) => setMarks(parseInt(e.target.value))}
//                     required
//                 />
//                 <button type='submit' disabled={isLoading}>
//                     {isLoading ? 'Creating Quiz...' : 'Create Quiz'}
//                 </button>
//                 {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             </form>
//         </div>
//     );
// };

// export default CreateTest;



import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CreateTest = () => {
    const [quizName, setQuizName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    const [timeLimit, setTimeLimit] = useState('');

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const quizRef = collection(db, 'quizzes');

        const docRef = await addDoc(quizRef, {
            quizName,
            description,
            points,
            timeLimit
        });

        history.push(`/quiz/${docRef.id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Quiz Name:
                <input type="text" value={quizName} onChange={(event) => setQuizName(event.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
            </label>
            <label>
                Points:
                <input type="number" value={points} onChange={(event) => setPoints(event.target.value)} />
            </label>
            <label>
                Time Limit:
                <input type="number" value={timeLimit} onChange={(event) => setTimeLimit(event.target.value)} />
            </label>
            <button type="submit">Create Quiz</button>
        </form>
    );
};

export default CreateTest;
