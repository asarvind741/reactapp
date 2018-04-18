import React from 'react';

function AnswereOption(props) {
    return (
        <li>
            <input type="radio"
                name="radioGroup"
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
    answer: React.PropTypes.string.isRequired,
    onAnswerSelected: React.PropTypes.func.isRequired


}

export default AnswereOption;