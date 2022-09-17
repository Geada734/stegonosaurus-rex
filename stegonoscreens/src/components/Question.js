import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { HandThumbsDown } from 'react-bootstrap-icons';

import classes from './Question.module.css';

function Question(props){
    return <div>
            <h3>{props.question}</h3>
            <div className={classes.answer + ' col-11'}>
                {props.answer}
            </div>
            <span className={classes.useful}>Was this answer useful?</span>
            <div>
                <ButtonGroup>
                    <Button variant='outline-success'><HandThumbsUp /></Button>
                    <Button variant='outline-danger'><HandThumbsDown /></Button>
                </ButtonGroup>
            </div>
        </div>
};

export default Question;