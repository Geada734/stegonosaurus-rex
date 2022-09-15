import strings from '../static/strings'

function AboutPage(){
    return <section>
        <div>
            <h1>{strings.about.header.en}</h1>
            {strings.about.text.en}
        </div>
    </section>;
};

export default AboutPage;