// Component for the FAQs page.
import { useContext } from "react";

import AppContext from "../store/app-context";

import Question from "../components/misc/Question";

import strings from "../static/strings.js";

import classes from "./style/FAQPage.module.css";

function FAQPage() {
  const appCtx = useContext(AppContext);

  return (
    <section>
      <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
      <div className={classes.questions}>
        {strings.faqs.map((q) => (
          <Question
            question={q[appCtx.language].question}
            qId={q.id}
            id={q.id}
            key={q.id}
            answer={q[appCtx.language].answer}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQPage;
