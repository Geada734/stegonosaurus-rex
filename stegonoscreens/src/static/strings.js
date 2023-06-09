import en from './flags/en.png';
import es from './flags/es.png';
import config from '../configs/config.json';

const strings = {
    "pageTitles": {
        "home": {
            "en": "Welcome to Stegonosaurus-Rex!",
            "es": "¡Bienvenido a Stegonosaurus-Rex!"
        },

        "about": {
            "en": "About Stegonosaurus-Rex",
            "es": "Acerca De Stegonosaurus-Rex"
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
            "en":
                <section>
                    <p>
                        Stegonosaurus-Rex is a fullstack web application that showcases the 
                        main <a href="https://pypi.org/project/stegonosaurus/">stegonosaurus</a> Python 
                        steganography library's functionalities, running on a headless Flask server (where the magic happens), 
                        a Mongo NoSQL database, and a React.JS UI.
                    </p>
                    <p>
                        <span style={{fontStyle: "italic"}}>Note: </span> API calls are secured with JWT validation. If you plan to
                        call the API directly, please contact the server admin to receive a valid usable token.
                    </p>
                    <h3>Usage</h3>
                    <p>Stegonosaurus-Rex currently provides two usage modes:</p>
                    <h6>Encoding</h6>
                    <p>
                        The user can encode a secret message into any .png multi-band image, by providing both,
                        the message where the image is going to be hidden in, and another .png multi-band image
                        with the message in bright letters on a black background.
                    </p>
                    <div style={{fontStyle: "italic", color: "#777"}}>Example of images.</div>
                    <p>
                        The image containing the message to be encoded <span style={{fontWeight: "bold"}}>cannot be
                        larger on either axis</span> than the image where the message is going to be hidden in.
                    </p>
                    <div style={{fontStyle: "italic", color: "#777"}}>"Encoding process" image</div>
                    <p>
                        After both images have been uploaded to the Flask server, the image with the message in bright letters
                        is going to be searched for the secret message, which will be imprinted into the template image. Once the
                        resulting image is saved it is very important <span style={{fontWeight: "bold"}}>not to make any changes to it
                        or the message might be lost</span>.
                    </p>
                    <div style={{fontStyle: "italic", color: "#777"}}>Resulting image</div>
                    <span style={{fontStyle: "italic"}}>Headless Server Usage</span>
                    <p>
                        The <span style={{fontStyle: "italic"}}>/encode </span> 
                        API can be called directly with the following form body:
                    </p>
                    <ul>
                        <li>
                            <span style={{fontStyle: "italic"}}>coded: </span> 
                            The image containing the message.
                        </li>
                        <li>
                            <span style={{fontStyle: "italic"}}>img: </span> 
                            The image where the message is going to be hidden.
                        </li>
                        <li>
                            <span style={{fontStyle: "italic"}}>img_filename: </span> 
                            Name of the file where the message is going to be hidden.
                        </li>
                    </ul>
                    <p>
                        The resulting image will be encoded to base64 and retrievable via the 
                        <span style={{fontStyle: "italic"}}> result </span>attribute.
                    </p>
                    <h6>Decoding</h6>
                    <p>
                        The user can also decode a message contained within a multi-band .png image.
                    </p>
                    <div style={{fontStyle: "italic", color: "#777"}}>Image to decode</div>
                    <p>
                        Once the image has been uploaded to the Flask server, it is going to be scanned
                        to find odd blue values in each pixel. There are two decoding modes:
                    </p>
                    <ul>
                        <li>
                            <span style={{fontWeight: "bold"}}>Transparent </span> mode will show the message on top of the original image in bright
                            red letters.
                        </li>
                        <li>
                            <span style={{fontWeight: "bold"}}>Black </span> mode will show the message on top of a black background in bright red letters.
                        </li>
                    </ul>
                    <div style={{fontStyle: "italic", color: "#777"}}>Examples of both results.</div>
                </section>,
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
                        Choose the all-black image with the coded message in bright letters. 
                        This image must not be taller, or wider than the image you want to hide your 
                        message.
                    </p>
                    <h2>2.- Upload the image you want to hide your message in:</h2>
                    <p>
                        The image can be larger than the first one on either axis,
                        but it cannot be smaller in width or height.
                    </p>
                </section>,
            "es": <section>
                <h2>1.- Sube la imagen con tu mensaje oculto:</h2>
                <p>
                    Escoge la imagen en negro con el mensaje escrito en letras claras,
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
                "en": "All uploaded images must be multi-band .png file, and smaller than " + config.imageSizeDisplay + ".",
                "es": "Todas las imágenes deben de ser .png multibanda, y menores en tamaño a " + config.imageSizeDisplay + "."
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
            "es": "La página que buscas no existe en la aplicación."
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
            "es": "Sube la imagen con tu mensaje codificado:"
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
        },

        "componentLoadingError": {
            "en": "Error loading component",
            "es": "Error cargando componente"
        },

        "invalidCaptchaMessage": {
            "en": "Invalid Captcha",
            "es": "Captcha Inválido"
        }
    },

    "loadingModal": {
        "loadingApp": {
            "en": "Loading...",
            "es": "Cargando..."
        },

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
                "derecho en la imagen, y descárgala manualmente."
        }
    }
};

export default strings;