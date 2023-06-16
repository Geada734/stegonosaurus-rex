// Component for the About page.
import { useContext } from "react";
import AppContext from "../store/app-context";
import strings from "../static/strings";
import AboutText from "../components/misc/AboutText";

function AboutPage() {
  const appCtx = useContext(AppContext);

  // The page only contains the About text.
  return (
    <section>
      <h1>{strings.pageTitles.about[appCtx.language]}</h1>
      <AboutText id="about-text" />
    </section>
  );
}

export default AboutPage;
