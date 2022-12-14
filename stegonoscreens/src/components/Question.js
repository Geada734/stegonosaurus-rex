import { useState, useContext } from 'react';

import axios from 'axios';
import parse from 'html-react-parser';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { HandThumbsDown } from 'react-bootstrap-icons';

import classes from './Question.module.css';

import config from '../configs/config.json';

import AppContext from '../store/app-context';

import strings from '../static/strings.js';
import errors from '../static/errors.js';

function Question(props){
    const appCtx = useContext(AppContext);

    const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(false);

    function rate(e, id, value){
        e.preventDefault();

        let vote = 0;

        if(value!==userRating) {
            if(userRating===0) {
                vote = value;
            }
            else {
                vote = value * 2;
            };
            setUserRating(value);
        }
        else {
            setUserRating(0);
            vote = value * -1;
        };
        
        const formData = new FormData();

        formData.append("id", id);
        formData.append("vote", vote);

        setLoading(true);

        axios.put(config.flaskServer + '/faqs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        })
        .then( () => setLoading(false))
        .catch(e => {
            let errorKey;

            if(e.response.status === 500) { 
                errorKey = e.response.data.error_codename;
            }
            else{
                errorKey = "unknown";
            };

            appCtx.raiseError(errors[errorKey]);
            setLoading(false);
            setUserRating(0);
            appCtx.setShowError(true)
        });
    };

    function renderButtonGroup() {
        if(loading){
            return <Spinner animation='border' role='status'></Spinner>
        }

        return <ButtonGroup>
            <Button variant='outline-success' onClick={(e) => rate(e, props.id, 1)}
            active={userRating === 1 ? true : false}>
                <HandThumbsUp />
            </Button>
            <Button variant='outline-danger' onClick={(e) => rate(e, props.id, -1)}
            active={userRating === -1 ? true : false}>
                <HandThumbsDown />
            </Button>
        </ButtonGroup>;
    };

    return <div>
            <h3>{props.question}</h3>
            <div className={classes.answer + ' col-11'}>
                {parse(props.answer)}
            </div>
            <div>
                <span className={classes.useful}>
                    {userRating === 0 ? strings.useful.unrated[appCtx.language] : strings.useful.rated[appCtx.language] }
                </span> 
                <div>
                    <div>
                        {renderButtonGroup()}
                    </div>
                </div>
            </div>
        </div>
};

export default Question;