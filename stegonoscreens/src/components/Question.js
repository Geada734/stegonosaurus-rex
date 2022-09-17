import {useState} from 'react';

import strings from '../static/strings.js';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { HandThumbsDown } from 'react-bootstrap-icons';
import { HandThumbsUpFill } from 'react-bootstrap-icons';
import { HandThumbsDownFill } from 'react-bootstrap-icons';

import classes from './Question.module.css';

function Question(props){
    const [rating, setRating] = useState('unrated');

    function rate(e, value){
        e.preventDefault();
        setRating(value);
    };

    function renderRatingControls(){
        let component = <div></div>

        switch (rating) {
            case 'unrated':
                component = <div>
                    <span className={classes.useful}>{strings.useful.unrated.en}</span>
                    <div>
                        <ButtonGroup>
                            <Button variant='outline-success' onClick={(e) => rate(e, 'up')}>
                                <HandThumbsUp />
                            </Button>
                            <Button variant='outline-danger' onClick={(e) => rate(e, 'down')}>
                                <HandThumbsDown />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>;
                break;

            case 'up':
                component = <div>
                    <span className={classes.useful}>{strings.useful.rated.en}</span>
                    <div>
                        <HandThumbsUpFill color='#198754' />
                    </div>
                </div>;
                break;

            case 'down': 
                component = <div>
                    <span className={classes.useful}>{strings.useful.rated.en}</span>
                    <div>
                        <HandThumbsDownFill color='#dc3545' />
                    </div>
                </div>;
                break;
        };

        return component;
    };

    return <div>
            <h3>{props.question}</h3>
            <div className={classes.answer + ' col-11'}>
                {props.answer}
            </div>
            <div>
                {renderRatingControls()}
            </div>
        </div>
};

export default Question;