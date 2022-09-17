import {useState} from 'react';

import strings from '../static/strings.js';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { HandThumbsDown } from 'react-bootstrap-icons';

import classes from './Question.module.css';

function Question(props){
    const [rating, setRating] = useState('unrated');

    function rate(e, value){
        e.preventDefault();

        if(value!==rating) {
            setRating(value)
        }
        else {
            setRating('unrated');
        };
    };

    return <div>
            <h3>{props.question}</h3>
            <div className={classes.answer + ' col-11'}>
                {props.answer}
            </div>
            <div>
                <span className={classes.useful}>
                    {rating === 'unrated' ? strings.useful.unrated.en : strings.useful.rated.en }
                </span> 
                <div>
                    <div>
                        <ButtonGroup>
                            <Button variant='outline-success' onClick={(e) => rate(e, 'up')}
                            active={rating === 'up' ? true : false}>
                                <HandThumbsUp />
                            </Button>
                            <Button variant='outline-danger' onClick={(e) => rate(e, 'down')}
                            active={rating === 'down' ? true : false}>
                                <HandThumbsDown />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
};

export default Question;