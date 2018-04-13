import React from 'react';

function QuestionCounter(props){
    return(
        <div className = "question-counter">
        Question <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    )
}

QuestionCounter.propTypes = {
    counter:React.PropTypes.number.isRequired,
    total:React.PropTypes.number.isRequired
}

export default QuestionCounter;