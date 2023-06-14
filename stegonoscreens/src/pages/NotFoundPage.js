import { useContext } from "react";

import AppContext from "../store/app-context";

import strings from "../static/strings.js";

function NotFoundPage() {
  const appCtx = useContext(AppContext);

  return (
    <section>
      <h1>{strings.notFoundPage.header[appCtx.language]}</h1>
      <span>{strings.notFoundPage.summary[appCtx.language]}</span>
    </section>
  );
}

export default NotFoundPage;
