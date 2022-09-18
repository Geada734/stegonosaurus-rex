import { useContext } from 'react';

import classes from './FAQPage.module.css'

import AppContext from '../store/app-context';
import  Question from '../components/Question';

import strings from '../static/strings.js'

function FAQPage(){
    const appCtx = useContext(AppContext);

    return <section>
        <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
        <div className={classes.questions}>
            {
                strings.faqs.map(q => <Question question={q.question[appCtx.language]} key={q.key} answer={q.answer[appCtx.language]} />)
            }
        </div>
    </section>
};

export default FAQPage;