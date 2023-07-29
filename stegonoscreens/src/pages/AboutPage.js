// Component for the About page.
import { useContext } from "react";

import AppContext from "../store/app-context";

import AboutText from "../components/misc/AboutText";

import strings from "../static/strings";

function AboutPage() {
  const appCtx = useContext(AppContext);

  // The page only contains the About text.
  return (
    <section>
      <h1>{strings.pageTitles.about[appCtx.language]}</h1>
      <AboutText />
    </section>
  );
}

export default AboutPage;
