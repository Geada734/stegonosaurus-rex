import { useState, useContext, useEffect } from 'react';

import classes from './style/FAQPage.module.css'

import AppContext from '../store/app-context';

import Question from '../components/misc/Question';
import * as errorHandlers from '../utils/errorHandlers';
import * as api from '../apis/faqsApi';

import strings from '../static/strings.js';

function FAQPage(){
    const appCtx = useContext(AppContext);
    
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        appCtx.popLoading(strings.loadingModal.loadingFAQs[appCtx.language]);
        api.getFaqs(handleFaqs, handleError, appCtx.token);
    }, []);

    function handleFaqs(response) {
        setFaqs(response.data.faqs);
        appCtx.popLoading('');
    };

    function handleError(e) {
        errorHandlers.handleRestError(e, appCtx.raiseError);
        appCtx.popLoading('');
    };

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