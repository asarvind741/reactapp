import React from 'react';

function Result(props) {
  return (
    <div className="result">
      {props.resultMessage}
      <br></br>
      Your Result is: <strong>{props.quizResult}</strong>.
    </div>
  );
}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
  resultMessage: React.PropTypes.string.isRequired
};

export default Result;