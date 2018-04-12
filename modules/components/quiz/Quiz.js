import React from 'react';
import Question from './Question';
import QuestionCounter from './QuestionCounter';
import AnswerOption from './AnswerOption';

function Quiz(props){

    function renderAnswerOptions(key) {
        return (
          <AnswerOption
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            questionId={props.questionId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
      }
    return (
        <div>
            <QuestionCounter
           counter={props.questionId}
           total={props.questionTotal}
         />

          <Question content={props.question} />
          <ul className="answerOptions">
           {props.answerOptions.map(renderAnswerOptions)}
         </ul>


        </div>
    )
}

Quiz.propTypes = {
    answer: React.PropTypes.string.isRequired,
    answerOptions: React.PropTypes.array.isRequired,
    question: React.PropTypes.string.isRequired,
    questionId: React.PropTypes.number.isRequired,
    questionTotal: React.PropTypes.number.isRequired,
    onAnswerSelected: React.PropTypes.func.isRequired,
  };

  export default Quiz;