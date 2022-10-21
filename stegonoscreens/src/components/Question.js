import { useState, useContext } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { HandThumbsDown } from 'react-bootstrap-icons';

import classes from './Question.module.css';

import AppContext from '../store/app-context';

import strings from '../static/strings.js';

function Question(props){
    const appCtx = useContext(AppContext);

    const [userRating, setUserRating] = useState('unrated');
    const [loading, setLoading] = useState(false);

    function rate(e, value){
        e.preventDefault();

        if(value!==userRating) {
            setUserRating(value)
        }
        else {
            setUserRating('unrated');
        };
    };

    function renderButtonGroup() {
        if(loading){
            return <Spinner animation='border' role='status'></Spinner>
        }

        return <ButtonGroup>
            <Button variant='outline-success' onClick={(e) => rate(e, 'up')}
            active={userRating === 'up' ? true : false}>
                <HandThumbsUp />
            </Button>
            <Button variant='outline-danger' onClick={(e) => rate(e, 'down')}
            active={userRating === 'down' ? true : false}>
                <HandThumbsDown />
            </Button>
        </ButtonGroup>;
    };

    return <div>
            <h3>{props.question}</h3>
            <div className={classes.answer + ' col-11'}>
                {props.answer}
            </div>
            <div>
                <span className={classes.useful}>
                    {userRating === 'unrated' ? strings.useful.unrated[appCtx.language] : strings.useful.rated[appCtx.language] }
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