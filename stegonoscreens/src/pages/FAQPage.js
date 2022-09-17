import classes from './FAQPage.module.css'

import  Question from '../components/Question';
import strings from '../static/strings.js'

function FAQPage(){
    return <section>
        <h1>Frequently Asked Questions</h1>
        <div className={classes.questions}>
            {
                strings.faqs.map(q => <Question question={q.question.en} answer={q.answer.en} />)
            }
        </div>
    </section>
};

export default FAQPage;