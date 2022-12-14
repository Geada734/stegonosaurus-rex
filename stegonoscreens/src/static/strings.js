import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";

import en from './flags/en.png';
import es from './flags/es.png';

const strings = {
    "pageTitles": {
        "home": {
            "en": "Welcome to Stegonosaurus!",
            "es": "¡Bienvenido a Stegonosaurus!"
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
            "key": "home" 
        },
        {
            "name": {
                "en": "About",
                "es": "Acerca De"
            },
            "path": "/about",
            "key": "about" 
        },
        {
            "name": {
                "en": "FAQs",
                "es": "Preguntas Frecuentes"
            },
            "path": "/faq",
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
    },

    "homePage": {
        "instructions": {
            "en": <section>
                    <h2>1.- Upload the image with the coded message:</h2>
                    <p>
                        Choose the all-black image with the coded message in red letters. 
                        This image must not be taller, or wider (or both) than the image you want to hide your 
                        message.
                    </p>
                    <h2>2.- Upload the image you want to hide your message in:</h2>
                    <p>
                        The image can be larger than the first one on either axis,
                        but it cannot be smaller in width or height.
                    </p>
                </section>,
            "es": <section>
                <h2>1.- Sube la imagen que trae el mensaje oculto:</h2>
                <p>
                    Escoge la imagen en negro con el mensaje escrito en letras rojas,
                    esta imagen no debe de ser más alta o ancha que la imagen en la que
                    quieres esconder el mensaje.
                </p>
                <h2>2.- Sube la imagen en la cual quieres esconder el mensaje:</h2>
                <p>
                    La imagen puede ser más alta o ancha que la primera imagen, pero no debe
                    de ser más chica en ninguno de sus ejes.
                </p>
            </section>
        },
        "warning": {
            "important": {
                "en": "IMPORTANT",
                "es": "IMPORTANTE"
            },
            "warningText": {
                "en": "All uploaded images must be multi-band .png file, and smaller than 2MB.",
                "es": "Todas las imagenes deben de ser .png multibanda, y más pequeñas de 2MB."
            }
        }
    },
    
    "notFoundPage": {
        "header": {
            "en": "Not Found",
            "es": "Página No Encontrada"
        },
        "summary": {
            "en": "The page you tried to reach does not exist within the application.",
            "es": "La página que buscas, no existe en la aplicación."
        }
    },
    "modeToggler": {
        "modes": {
            "encode": {
                "en": "Encode",
                "es": "Codificar"
            },
            "decode": {
                "en": "Decode",
                "es": "Decodificar"
            }
        },
        "decodingModeLabel": {
            "en": "Decoding Mode",
            "es": "Modo de Decodificación"
        },
        "decodingModes": {
            "t": {
                "en": "Transparent",
                "es": "Transparencia"
            },
            "b": {
                "en": "Black",
                "es": "En Negro"
            }
        },
        "messageImageMessage": {
            "en": "Upload the image that has your coded message:",
            "es": "Sube la imagen que trae to mensaje codificado:"
        },
        "toCodeImageMessage": {
            "en": "Upload image to be encoded:",
            "es": "Sube la imagen a codificar:" 
        },
        "toDecodeImageMessage": {
            "en": "Upload the image you wish to decode:",
            "es": "Sube la imagen a decodificar:"
        },
        "buttonMessage": {
            "encode": {
                "en": "Encode",
                "es": "Codificar"
            },
            "decode": {
                "en": "Decode",
                "es": "Decodificar"
            }
        }
    },

    "loadingModal": {
        "processingImages": {
            "en": "Processing images...",
            "es": "Procesando imágenes..."
        },
        "loadingFAQs": {
            "en": "Loading FAQs...",
            "es": "Cargando preguntas frecuentes..."
        }
    },

    "resultsModal": {
        "header": {
            "en": "Results",
            "es": "Resultados"
        },
        "download": {
            "en": "Your download will start automatically, otherwise, feel free to " +
                "download the displayed image.",
            "es": "Tu descarga comenzará en breve, de lo contrario, solamente haz click " +
                "derecho en la imagen, y descargala."
        }
    }
};

export default strings;