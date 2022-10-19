import config from '../configs/config.json';

import { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import classes from './FAQPage.module.css'

import AppContext from '../store/app-context';
import Question from '../components/Question';

import strings from '../static/strings.js'

function FAQPage(){
    const appCtx = useContext(AppContext);
    
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get(config.flaskServer + "/faqs")
        .then(response => {
            setFaqs(response.data.faqs);
        })
    }, []);

    return <section>
        <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
        <div className={classes.questions}>
            {
                faqs.map(q => <Question question={q[appCtx.language].question} key={q.id} answer={q[appCtx.language].answer} />)
            }
        </div>
    </section>
};

export default FAQPage;