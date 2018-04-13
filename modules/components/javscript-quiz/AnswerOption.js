import React from 'react';

function AnswereOption(props) {
    return (
        <li>
            <input type="radio"
                name="radioGroup"
                checked={props.answerType === props.answer}
                value={props.answer}
                onChange={props.onAnswerSelected}
            />


            <label className="radioCustomLabel">
                {props.answer}
            </label>
        </li>
    )
}

AnswereOption.propTypes = {
    answerType: React.PropTypes.string.isRequired,
    answer: React.PropTypes.string.isRequired,
    onAnswerSelected: React.PropTypes.func.isRequired


}

export default AnswereOption;