import React from 'react';
import Question from './Question';
import QuestionCounter from './QuestionCounter';
import AnswerOption from './AnswerOption';

function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key}
        answer={key}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }


  return (
    <div>
      <QuestionCounter
        counter={props.questionId}
        total={props.questionTotal} />

      <Question content={props.question} />
      <ul className="answerOptions"> <span className = "select-answer">Please select correct answer:</span>
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
      <button className = "submit-button" onClick = {props.onAnswerSelected} value = "previous">Previous</button>
      <button className = "submit-button" onClick = {props.onAnswerSelected} value = "next">Next</button>

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