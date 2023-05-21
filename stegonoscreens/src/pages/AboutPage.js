import { useContext } from 'react';

import classes from './style/AboutPage.module.css';

import AppContext from '../store/app-context';

import strings from '../static/strings';

function AboutPage(){
    const appCtx = useContext(AppContext);

    return <section>
        <div>
            <h1>{strings.pageTitles.about[appCtx.language]}</h1>
                <section className={classes.aboutText}>
                    {strings.about.text[appCtx.language]}
                </section>
        </div>
    </section>;
};

export default AboutPage;