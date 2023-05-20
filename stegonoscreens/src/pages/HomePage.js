import { useContext } from "react";

import classes from "./style/HomePage.module.css";

import ModeToggler from '../components/imageHandler/ModeToggler';

import AppContext from "../store/app-context";

import strings from "../static/strings";

function HomePage() {
    const appCtx = useContext(AppContext);

    return <section>
            <div className={classes.instructions}>
                <h1>{strings.pageTitles.home[appCtx.language]}</h1>
                {strings.homePage.instructions[appCtx.language]}
                <h4 className={classes.importantWarning}>
                    {strings.homePage.warning.important[appCtx.language]}
                </h4>
                <p>{strings.homePage.warning.warningText[appCtx.language]}</p>
            </div>
            <ModeToggler></ModeToggler>
        </section>
};

export default HomePage;