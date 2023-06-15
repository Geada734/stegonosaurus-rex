import en from "./flags/en.png";
import es from "./flags/es.png";
import config from "../configs/config.json";

const strings = {
  pageTitles: {
    home: {
      en: "Welcome to Stegonosaurus-Rex!",
      es: "¡Bienvenido a Stegonosaurus-Rex!",
    },

    about: {
      en: "About Stegonosaurus-Rex",
      es: "Acerca De Stegonosaurus-Rex",
    },

    faqs: {
      en: "Frequently Asked Questions",
      es: "Preguntas Frecuentes",
    },
  },

  navItems: [
    {
      name: {
        en: "Home",
        es: "Página Principal",
      },
      path: "/",
      key: "home",
    },

    {
      name: {
        en: "About",
        es: "Acerca De",
      },
      path: "/about",
      key: "about",
    },

    {
      name: {
        en: "FAQs",
        es: "Preguntas Frecuentes",
      },
      path: "/faq",
      key: "faq",
    },
  ],

  useful: {
    unrated: {
      en: "Was this answer useful?",
      es: "¿Fue útil esta respuesta?",
    },
    rated: {
      en: "Thanks for your feedback!",
      es: "¡Gracias por calificar!",
    },
  },

  languageControl: {
    label: {
      en: "Language",
      es: "Idioma",
    },
    languages: [
      {
        label: "English",
        value: "en",
        key: "en",
        flagPointer: en,
        flagAlt: "EN ",
      },
      {
        label: "Español",
        value: "es",
        key: "es",
        flagPointer: es,
        flagAlt: "ES ",
      },
    ],
  },

  homePage: {
    instructions: {
      en: (
        <section>
          <h2>1.- Upload the image with the coded message:</h2>
          <p>
            Choose the all-black image with the coded message in bright letters.
            This image must not be taller, or wider than the image you want to
            hide your message.
          </p>
          <h2>2.- Upload the image you want to hide your message in:</h2>
          <p>
            The image can be larger than the first one on either axis, but it
            cannot be smaller in width or height.
          </p>
        </section>
      ),
      es: (
        <section>
          <h2>1.- Sube la imagen con tu mensaje oculto:</h2>
          <p>
            Escoge la imagen en negro con el mensaje escrito en letras claras,
            esta imagen no debe de ser más alta o ancha que la imagen en la que
            quieres esconder el mensaje.
          </p>
          <h2>2.- Sube la imagen en la cual quieres esconder el mensaje:</h2>
          <p>
            La imagen puede ser más alta o ancha que la primera imagen, pero no
            debe de ser más chica en ninguno de sus ejes.
          </p>
        </section>
      ),
    },

    warning: {
      important: {
        en: "IMPORTANT",
        es: "IMPORTANTE",
      },
      warningText: {
        en:
          "All uploaded images must be multi-band .png file, and smaller than " +
          config.imageSizeDisplay +
          ".",
        es:
          "Todas las imágenes deben de ser .png multibanda, y menores en tamaño a " +
          config.imageSizeDisplay +
          ".",
      },
    },
  },

  notFoundPage: {
    header: {
      en: "Not Found",
      es: "Página No Encontrada",
    },
    summary: {
      en: "The page you tried to reach does not exist within the application.",
      es: "La página que buscas no existe en la aplicación.",
    },
  },

  imageProcessor: {
    modes: {
      encode: {
        en: "Encode",
        es: "Codificar",
      },
      decode: {
        en: "Decode",
        es: "Decodificar",
      },
    },

    decodingModeLabel: {
      en: "Decoding Mode",
      es: "Modo de Decodificación",
    },

    decodingModes: {
      t: {
        en: "Transparent",
        es: "Transparencia",
      },
      b: {
        en: "Black",
        es: "En Negro",
      },
    },

    codedImageMessage: {
      en: "Upload the image that has your coded message:",
      es: "Sube la imagen con tu mensaje codificado:",
    },

    templateImageMessage: {
      en: "Upload image to be encoded:",
      es: "Sube la imagen a codificar:",
    },

    toDecodeImageMessage: {
      en: "Upload the image you wish to decode:",
      es: "Sube la imagen a decodificar:",
    },

    buttonMessage: {
      encode: {
        en: "Encode",
        es: "Codificar",
      },
      decode: {
        en: "Decode",
        es: "Decodificar",
      },
    },

    componentLoadingError: {
      en: "Error loading component",
      es: "Error cargando componente",
    },

    invalidCaptchaMessage: {
      en: "Invalid Captcha",
      es: "Captcha Inválido",
    },
  },

  loadingModal: {
    loadingApp: {
      en: "Loading...",
      es: "Cargando...",
    },

    processingImages: {
      en: "Processing images...",
      es: "Procesando imágenes...",
    },

    loadingFAQs: {
      en: "Loading FAQs...",
      es: "Cargando preguntas frecuentes...",
    },
  },

  resultsModal: {
    header: {
      en: "Results",
      es: "Resultados",
    },

    download: {
      en:
        "Your download will start automatically, otherwise, feel free to " +
        "download the displayed image.",
      es:
        "Tu descarga comenzará en breve, de lo contrario, solamente haz click " +
        "derecho en la imagen, y descárgala manualmente.",
    },
  },
};

export default strings;
