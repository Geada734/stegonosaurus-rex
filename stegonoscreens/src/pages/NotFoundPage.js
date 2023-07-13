// Component for an nonexistent route.
import { useContext } from "react";

import AppContext from "../store/app-context";

import strings from "../static/strings";

function NotFoundPage() {
  const appCtx = useContext(AppContext);

  // This page only contains a text saying that the page is not found in the app.
  return (
    <section>
      <h1>{strings.notFoundPage.header[appCtx.language]}</h1>
      <span>{strings.notFoundPage.summary[appCtx.language]}</span>
    </section>
  );
}

export default NotFoundPage;
