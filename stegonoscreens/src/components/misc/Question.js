// Question component for the FAQs page.
import { useState, useContext } from "react";

import parse from "html-react-parser";

import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import { HandThumbsUp } from "react-bootstrap-icons";
import { HandThumbsDown } from "react-bootstrap-icons";

import classes from "./style/Question.module.css";

import * as errorHandlers from "../../utils/errorHandlers";
import * as api from "../../apis/faqsApi";

import AppContext from "../../store/app-context";

import strings from "../../static/strings.js";
import * as faqsForms from "../../utils/faqsForms";

function Question(props) {
  const appCtx = useContext(AppContext);

  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handles the response of rating a FAQ.
  function handleResponse() {
    setLoading(false);
  }

  // Handles REST error on rating a FAQ.
  function handleError(e) {
    /*
     * e: REST error.
     */
    errorHandlers.handleRestError(e, appCtx.raiseError);
    setLoading(false);
    setUserRating(0);
  }

  // Changes a rating of a question on the DB.
  function rate(event, id, value) {
    event.preventDefault();
    setLoading(true);

    // API Form
    let formData = faqsForms.createVoteForm(
      id,
      value,
      userRating,
      setUserRating
    );

    // API call.
    api.rateQuestion(handleResponse, handleError, appCtx.token, formData);
  }

  // Render the rating buttons.
  function renderButtonGroup() {
    // If the user triggered an API call, display a spinning wheel until
    // a valid response comes from the call.
    if (loading) {
      return <Spinner animation="border" role="status"></Spinner>;
    }

    return (
      <ButtonGroup>
        <Button
          variant="outline-success"
          onClick={(e) => rate(e, props.qId, 1)}
          active={userRating === 1 ? true : false}
        >
          <HandThumbsUp />
        </Button>
        <Button
          variant="outline-danger"
          onClick={(e) => rate(e, props.qId, -1)}
          active={userRating === -1 ? true : false}
        >
          <HandThumbsDown />
        </Button>
      </ButtonGroup>
    );
  }

  // A question consists of a question (yeah, sounds weird), an answer in HTML format,
  // and a button group (or loading wheel) for rating.
  return (
    <div className={classes.question}>
      <h3>{props.question}</h3>
      <div className={classes.answer}>{parse(props.answer)}</div>
      <div>
        <span className={classes.useful}>
          {userRating === 0
            ? strings.useful.unrated[appCtx.language]
            : strings.useful.rated[appCtx.language]}
        </span>
        <div>
          <div>{renderButtonGroup()}</div>
        </div>
      </div>
    </div>
  );
}

export default Question;
