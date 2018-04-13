import React from 'react';


function AnswerOption(props){
    return (
    <li>
        <input type = "radio" name="radioGroup" 
         checked={props.answerType === props.answer}
         id={props.answerType}
         value={props.answerType}
         onChange={props.onAnswerSelected}
       />

        <label className="radioCustomLabel">
          {props.answerContent}
        </label>
    </li>
    )
}

AnswerOption.propTypes = {
    answerType: React.PropTypes.string.isRequired,
    answerContent: React.PropTypes.string.isRequired,
    answer: React.PropTypes.string.isRequired,
    onAnswerSelected: React.PropTypes.func.isRequired
  };

  export default AnswerOption;