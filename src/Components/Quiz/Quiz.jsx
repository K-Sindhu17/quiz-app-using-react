import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [isAnswerSelected, setIsAnswerSelected] = useState(false); // Track if an answer is selected
    let [showScore, setShowScore] = useState(false); // Track if we are at the end of the quiz

    const checkAnswer = (e, selectedAns) => {
        if (lock === false) {
            setLock(true); 
            setIsAnswerSelected(true); // Mark answer as selected
            if (selectedAns === question.ans) {
                e.target.classList.add('correct');
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add('wrong');
                const correctOption = document.querySelector(`li[data-option="${question.ans}"]`);
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
        }
    };

    const nextQuestion = () => {
        if (isAnswerSelected) { // Only allow next if an answer was selected
            if (index < data.length - 1) {
                setIndex(index + 1);
                setQuestion(data[index + 1]);
                setLock(false);
                setIsAnswerSelected(false); // Reset for the next question
                document.querySelectorAll('li').forEach((li) => {
                    li.classList.remove('correct', 'wrong');
                    return null;
                });
            } else {
                setShowScore(true); // Show score if it's the last question
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr/>
            {showScore ? (
                <div>
                    <h2>Your Score: {score} out of {data.length}</h2>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>

                    <ul>
                        <li data-option="1" onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                        <li data-option="2" onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                        <li data-option="3" onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                        <li data-option="4" onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                    </ul>

                    <button onClick={nextQuestion}>Next</button>

                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
