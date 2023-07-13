// Component for the Home Page.
import { useContext } from "react";

import AppContext from "../store/app-context";

import ImageProcessor from "../components/imageHandlers/ImageProcessor";

import strings from "../static/strings";

import classes from "./style/HomePage.module.css";

function HomePage() {
  const appCtx = useContext(AppContext);

  // The page contains only the ImageProcessor component preceded
  // by some instructive text.
  return (
    <section>
      <div className={classes.instructions}>
        <h1>{strings.pageTitles.home[appCtx.language]}</h1>
        {strings.homePage.instructions[appCtx.language]}
        <h4 className={classes.importantWarning}>
          {strings.homePage.warning.important[appCtx.language]}
        </h4>
        <p>{strings.homePage.warning.warningText[appCtx.language]}</p>
      </div>
      <ImageProcessor id="image-processor" />
    </section>
  );
}

export default HomePage;
