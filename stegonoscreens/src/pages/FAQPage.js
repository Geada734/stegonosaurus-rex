import config from '../configs/config.json';

import { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import classes from './style/FAQPage.module.css'

import AppContext from '../store/app-context';

import Question from '../components/misc/Question';
import * as errorHandlers from '../utils/errorHandlers';

import strings from '../static/strings.js';

function FAQPage(){
    const appCtx = useContext(AppContext);
    
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        appCtx.popLoading(strings.loadingModal.loadingFAQs[appCtx.language]);

        axios.get(config.flaskServer + "/faqs", {
            headers: {
                Authorization: "Bearer " + appCtx.token
            }
        })
        .then(response => {
            setFaqs(response.data.faqs);
            appCtx.popLoading('');
        }).catch(e => {
            errorHandlers.handleRestError(e, appCtx.raiseError);

            appCtx.popLoading('');
        })
    }, []);

    return <section>
        <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
        <div className={classes.questions}>
            {
                faqs.map(q => <Question question={q[appCtx.language].question} id={q.id} key={q.id} rating={q.rating} answer={q[appCtx.language].answer} />)
            }
        </div>
    </section>
};

export default FAQPage;