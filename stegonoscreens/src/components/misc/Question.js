// Question component for the FAQs page.
import classes from "./style/Question.module.css";

function Question(props) {
 // A question consists of a question (yeah, sounds weird), and an answer.
 return (
  <div className={classes.question}>
   <h3>{props.question}</h3>
   <div className={classes.answer}>{props.answer}</div>
  </div>
 );
}

export default Question;
