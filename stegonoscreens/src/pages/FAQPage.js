import config from '../configs/config.json';

import { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import classes from './FAQPage.module.css'

import AppContext from '../store/app-context';

import Question from '../components/Question';
import LoadingModal from '../components/LoadingModal';
import ErrorModal from '../components/ErrorModal';

import strings from '../static/strings.js';
import errors from '../static/errors.js';

function FAQPage(){
    const appCtx = useContext(AppContext);
    
    const [faqs, setFaqs] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowLoading(true);

        axios.get(config.flaskServer + "/faqs")
        .then(response => {
            setFaqs(response.data.faqs);
            setShowLoading(false);
        }).catch(e => {
            let errorKey;

            if(e.response.status === 500) { 
                errorKey = e.response.data.error_codename;
            }
            else{
                errorKey = "unknown";
            };

            setShowLoading(false);
            setError(errors[errorKey]);
            setShowError(true);
        })
    }, []);

    function closeErrorModal() {
        setError(null);
        setShowError(false);
    };

    return <section>
        <h1>{strings.pageTitles.faqs[appCtx.language]}</h1>
        <div className={classes.questions}>
            {
                faqs.map(q => <Question question={q[appCtx.language].question} id={q.id} key={q.id} rating={q.rating} answer={q[appCtx.language].answer} />)
            }
        </div>
        <LoadingModal showModal={showLoading} title={strings.loadingModal.loadingFAQs[appCtx.language]}/>
        <ErrorModal error={error} showModal={showError} closeHandler={closeErrorModal}></ErrorModal>
    </section>
};

export default FAQPage;