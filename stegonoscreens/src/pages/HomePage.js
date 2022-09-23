import { useContext } from "react";

import classes from "./HomePage.module.css";

import ModeToggler from '../components/ModeToggler';

import AppContext from "../store/app-context";

import strings from "../static/strings";

function HomePages() {
    const appCtx = useContext(AppContext);

    return <section>
            <div className={classes.instructions}>
                <h1>{strings.pageTitles.home[appCtx.language]}</h1>
                <h2>1.- Upload the image with the coded message:</h2>
                <p>
                    Choose the all-black image with the coded message in red letters. 
                    This image must not be taller, or wider (or both) than the image you want to hide your 
                    message.
                </p>
                <h2>2.- Upload the image you want to hide your message in:</h2>
                <p>
                    The image can be larger than the first one on either axis,
                    but it cannot be wider or taller.
                </p>
                <h4 className={classes.importantWarning}>IMPORTANT:</h4>
                <p>All uploaded images must be multi-band .png files.</p>
            </div>
            <ModeToggler></ModeToggler>
        </section>
};

export default HomePages;