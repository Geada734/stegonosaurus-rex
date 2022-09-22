import { useContext } from "react";

import AppContext from "../store/app-context";

import classes from "./HomePage.module.css";

import strings from "../static/strings";

function HomePages() {
    const appCtx = useContext(AppContext);

    return <section>
            <h1>{strings.pageTitles.home[appCtx.language]}</h1>
            <h2>1.- Upload the image with the coded message:</h2>
            <p className={classes.instructionP}>
                Choose the all-black image with the coded message in red letters. 
                This image must not be taller, or wider (or both) than the image you want to hide your 
                message.
            </p>
            <h2>2.- Upload the image you want to hide your message in:</h2>
            <p className={classes.instructionP}>
                The image can be larger than the first one on either axis,
                but it cannot be wider or taller.
            </p>
        </section>
};

export default HomePages;