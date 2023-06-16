// Component for the FAQs page.
import { useState, useContext, useEffect } from "react";

import AppContext from "../store/app-context";

import * as errorHandlers from "../utils/errorHandlers";
import * as api from "../apis/faqsApi";

import Question from "../components/misc/Question";

import strings from "../static/strings.js";

import classes from "./style/FAQPage.module.css";

function FAQPage() {
  const appCtx = useContext(AppContext);

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Get FAQs from the server.
    appCtx.popLoading(strings.loadingModal.loadingFAQs[appCtx.language]);
    api.getFaqs(handleFaqs, handleError, appCtx.token);
  }, []);

  // Handles the response for the initial REST call.
  function handleFaqs(response) {
    /*
     * response: REST response.
     */
    setFaqs(response.data.faqs);
    appCtx.popLoading("");
  }

  // Handles any errors in the REST call.
  function handleError(e) {
    /*
     * e: error response.
     */
    errorHandlers.handleRestError(e, appCtx.raiseError);
    appCtx.popLoading("");
  }

  return (
    <section>
      <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
      <div className={classes.questions}>
        {faqs.map((q) => (
          <Question
            question={q[appCtx.language].question}
            qId={q.id}
            id={q.id}
            key={q.id}
            rating={q.rating}
            answer={q[appCtx.language].answer}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQPage;
