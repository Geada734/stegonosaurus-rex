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

  function handleResponse() {
    setLoading(false);
  }

  function handleError(e) {
    errorHandlers.handleRestError(e, appCtx.raiseError);
    setLoading(false);
    setUserRating(0);
  }

  function rate(e, id, value) {
    e.preventDefault();
    setLoading(true);

    let formData = faqsForms.createVoteForm(
      id,
      value,
      userRating,
      setUserRating
    );

    api.rateQuestion(handleResponse, handleError, appCtx.token, formData);
  }

  function renderButtonGroup() {
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
