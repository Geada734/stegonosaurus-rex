import { useContext } from "react";
import AppContext from "../store/app-context";
import strings from "../static/strings";
import AboutText from "../components/misc/AboutText";

function AboutPage() {
  const appCtx = useContext(AppContext);

  return (
    <section>
      <h1>{strings.pageTitles.about[appCtx.language]}</h1>
      <AboutText id="about-text" />
    </section>
  );
}

export default AboutPage;
