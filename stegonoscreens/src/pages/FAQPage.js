import config from '../configs/config.json';

import { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import classes from './style/FAQPage.module.css'

import AppContext from '../store/app-context';

import Question from '../components/misc/Question';

import strings from '../static/strings.js';
import errors from '../static/errors.js';

function FAQPage(){
    const appCtx = useContext(AppContext);
    
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        appCtx.setLoadingText(strings.loadingModal.loadingFAQs[appCtx.language]);
        appCtx.setShowLoading(true);

        axios.get(config.flaskServer + "/faqs", {
            headers: {
                Authorization: "Bearer " + appCtx.token
            }
        })
        .then(response => {
            setFaqs(response.data.faqs);
            appCtx.setShowLoading(false);
            appCtx.setLoadingText('');
        }).catch(e => {
            let errorKey;

            if(e.response.status === 500 || e.response.status === 401) { 
                errorKey = e.response.data.error_codename;
            }
            else{
                errorKey = "unknown";
            };

            appCtx.setShowLoading(false);
            appCtx.setLoadingText('');
            appCtx.raiseError(errors[errorKey]);
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