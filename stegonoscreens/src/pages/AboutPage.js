import { useContext } from 'react';

import classes from './style/AboutPage.module.css';

import AppContext from '../store/app-context';

import strings from '../static/strings';

function AboutPage(){
    const appCtx = useContext(AppContext);

    return <section>
        <h1>{strings.pageTitles.about[appCtx.language]}</h1>
        {strings.about.text[appCtx.language]}
    </section>;
};

export default AboutPage;