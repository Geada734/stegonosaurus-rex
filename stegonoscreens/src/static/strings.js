import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";

import en from './flags/en.png';
import es from './flags/es.png';

const strings = {
    "pageTitles": {
        "home": {
            "en": "Home",
            "es": "Página Principal"
        },
        "about": {
            "en": "About Stegonosaurus",
            "es": "Acerca De Stegonosaurus"
        },
        "faqs": {
            "en": "Frequently Asked Questions",
            "es": "Preguntas Frecuentes"
        }
    }, 

    "navItems": [
        {
            "name": {
                "en": "Home",
                "es": "Página Principal"
            },
            "path": "/",
            "element": <HomePage />,
            "key": "home" 
        },
        {
            "name": {
                "en": "About",
                "es": "Acerca De"
            },
            "path": "/about",
            "element": <AboutPage />,
            "key": "about" 
        },
        {
            "name": {
                "en": "FAQs",
                "es": "Preguntas Frecuentes"
            },
            "path": "/faq",
            "element": <FAQPage />,
            "key": "faq" 
        }
    ],

    "about": {
        "text":{
            "en": <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing 
                    elit mi mus, torquent sagittis condimentum in sociosqu 
                    id luctus. Nam pellentesque mi vehicula id magna vulputate nisl 
                    tempus ad, dui nisi molestie parturient tortor turpis vel blandit, 
                    inceptos natoque interdum at congue nibh rhoncus litora. 
                    Elementum maecenas rhoncus id nunc curae molestie gravida, 
                    sagittis eu ridiculus congue dis hac, posuere aliquet leo nisl 
                    himenaeos dui.
                </p> 
                <p>
                    Convallis condimentum eu tincidunt 
                    penatibus mollis, litora est pellentesque scelerisque, 
                    vestibulum ridiculus lectus non. Erat aenean ornare eu accumsan 
                    montes ridiculus dapibus sapien euismod, vitae laoreet litora netus 
                    torquent parturient magnis. Cubilia eleifend nunc sagittis 
                    dapibus ullamcorper ultrices quis, augue aptent torquent lacinia 
                    commodo sed sollicitudin hendrerit, et nostra sodales condimentum 
                    curabitur dictum. Bibendum mi sagittis accumsan himenaeos quisque 
                    curabitur, nec in porttitor ligula nostra dapibus, maecenas quis 
                    at tempor congue.
                </p>
            </div>,
            "es": <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing 
                    elit mi mus, torquent sagittis condimentum in sociosqu 
                    id luctus. Nam pellentesque mi vehicula id magna vulputate nisl 
                    tempus ad, dui nisi molestie parturient tortor turpis vel blandit, 
                    inceptos natoque interdum at congue nibh rhoncus litora. 
                    Elementum maecenas rhoncus id nunc curae molestie gravida, 
                    sagittis eu ridiculus congue dis hac, posuere aliquet leo nisl 
                    himenaeos dui.
                </p> 
                <p>
                    Convallis condimentum eu tincidunt 
                    penatibus mollis, litora est pellentesque scelerisque, 
                    vestibulum ridiculus lectus non. Erat aenean ornare eu accumsan 
                    montes ridiculus dapibus sapien euismod, vitae laoreet litora netus 
                    torquent parturient magnis. Cubilia eleifend nunc sagittis 
                    dapibus ullamcorper ultrices quis, augue aptent torquent lacinia 
                    commodo sed sollicitudin hendrerit, et nostra sodales condimentum 
                    curabitur dictum. Bibendum mi sagittis accumsan himenaeos quisque 
                    curabitur, nec in porttitor ligula nostra dapibus, maecenas quis 
                    at tempor congue.
                </p>
            </div>
        }
    },

    "faqs": [
        {
            "question": {
                "en": "why dis?",
                "es": "porke esto"
            },
            "answer": {
                "en":<div> 
                    <p>cuz dis.</p>
                </div>,
                "es": <div>
                    <p>por ezto</p>
                </div>
            },
            "key": 1
        },
        {
            "question": {
                "en": "how dis?",
                "es": "komo?"
            },
            "answer": {
                "en": <div> 
                    <p>like dis.</p>
                </div>,
                "es": <div>
                    <p>azi</p>
                </div>
            },
            "key": 2
        },
        {
            "question": {
                "en": "lorem ipsum?",
                "es": "lorem ipsum?"
            },
            "answer": {
                "en": <div>
                    <p>
                        litora est pellentesque scelerisque,
                        vestibulum ridiculus lectus non. Erat aenean 
                        ornare eu accumsan montes ridiculus dapibus
                        sapien euismod, vitae laoreet litora netus
                        torquent parturient magnis
                    </p>
                </div>,
                "es": <div>
                    <p>
                        litora est pellentesque scelerisque,
                        vestibulum ridiculus lectus non. Erat aenean 
                        ornare eu accumsan montes ridiculus dapibus
                        sapien euismod, vitae laoreet litora netus
                        torquent parturient magnis
                    </p>
                </div>
            },
            "key": 3
        }
    ],

    "useful": {
        "unrated": {
            "en": "Was this answer useful?",
            "es": "¿Fue útil esta respuesta?"
        },
        "rated": {
            "en": "Thanks for your feedback!",
            "es": "¡Gracias por calificar!"
        }
    },

    "languageControl": {
        "label": {
            "en": "Language",
            "es": "Idioma"
        },
        "languages": [
            {
                "label": "English",
                "value": "en",
                "key": "en",
                "flagPointer": en,
                "flagAlt": "EN "
            },
            {
                "label": "Español",
                "value": "es",
                "key": "es",
                "flagPointer": es,
                "flagAlt": "ES "
            }
        ]
    }
};

export default strings;