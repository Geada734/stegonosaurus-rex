import strings from '../static/strings';

import classes from './AboutPage.module.css';

function AboutPage(){
    return <section>
        <div>
            <h1>{strings.about.header.en}</h1>
                <section className={classes.aboutText}>
                    {strings.about.text.en}
                </section>
        </div>
    </section>;
};

export default AboutPage;