import React from 'react';

function Question(props){
    return(
        <h6 className = "question">{props.content} </h6>
    )
}

Question.propTypes = {
    content: React.PropTypes.string.isRequired
}

export default Question;