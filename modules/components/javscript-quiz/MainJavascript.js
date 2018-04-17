import React from 'react';
import update from 'react-addons-update';

import Question from './Question';
import QuizQuestions from './quizQuestions';
import Quiz from './Quiz';
import Result from './Result';

class MainJavascript extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      correctAnswer: '',
      result: '',
      previousAnswer:'',
      correctAnswerCount:0,
      resultMessage:'',
      alreadySelectedAnswer:''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = QuizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log('suffled answer options', shuffledAnswerOptions)
    this.setState({
      question: QuizQuestions[0].question,
      correctAnswer:QuizQuestions[0].correctAnswer,
      answerOptions: shuffledAnswerOptions[0]
    });
    console.log("answer options----", this.state.answerOptions);
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    //console.log("event-----", event.target.value);

    if (event.currentTarget.value === "next") {

      if (this.state.questionId < QuizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      }
      else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
    }
    else if (event.currentTarget.value === 'previous') {
     // console.log("previous event", event.currentTarget.value);

      if (this.state.questionId > 1 || this.state.question <= QuizQuestions.length) {
        //console.log("previous event second");
        setTimeout(() => this.setPreviousQuestion(), 300);
      }
    }

    else {
      this.setUserAnswer(event.currentTarget.value);
    }
  }

  setUserAnswer(answer) {
    const correctAnswer = this.state.correctAnswer;
    const alreadySelectedAnswer = this.state.alreadySelectedAnswer;
    console.log("answer selected by user----", answer);
    if(correctAnswer === answer && correctAnswer!= alreadySelectedAnswer){
    this.setState({
      correctAnswerCount: this.state.correctAnswerCount + 1,
      alreadySelectedAnswer:this.state.answer,
      answer: answer
    });

    console.log("correct answer count is-", this.state.correctAnswerCount);
  }
}

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.state.previousAnswer = this.state.answer;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: QuizQuestions[counter].question,
      answerOptions: QuizQuestions[counter].answers,
      correctAnswer:QuizQuestions[counter].correctAnswer,
      answer: ''
    });
  }

  setPreviousQuestion() {
    console.log('inside previous function');
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;
    console.log("previous answer------", this.state.previousAnswer);

    this.setState({
      counter: counter,
      questionId: questionId,
      question: QuizQuestions[counter].question,
      answerOptions: QuizQuestions[counter].answers,
      answer:this.state.previousAnswer
    })
  }

  getResults() {
    const answersCount = this.state.correctAnswerCount;
    var reusltCalculate = answersCount* 100/(QuizQuestions.length);
    console.log("calculate result", reusltCalculate);
    reusltCalculate = reusltCalculate.toFixed(2);
    return reusltCalculate;
  }

  setResults(reusltCalculate) {
    console.log("result", reusltCalculate);
    var message;
    if(reusltCalculate>=70){
      message = "You have passed quiz successfully."
    }
    else if(reusltCalculate<70){
      message = "Ops! You got failed. Please give another try.."
    }
    this.setState({
      result:reusltCalculate,
      resultMessage: message
    })
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={QuizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result}
             resultMessage = { this.state.resultMessage} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>React Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default MainJavascript;