// Index for all the text in the app.
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
      Choose the all-black image with the coded message in bright letters. This
      image must not be taller, or wider than the image you want to hide your
      message.
     </p>
     <h2>2.- Upload the image you want to hide your message in:</h2>
     <p>
      The image can be larger than the first one on either axis, but it cannot
      be smaller in width or height.
     </p>
    </section>
   ),
   es: (
    <section>
     <h2>1.- Sube la imagen con tu mensaje oculto:</h2>
     <p>
      Escoge la imagen en negro con el mensaje escrito en letras claras, esta
      imagen no debe de ser más alta o ancha que la imagen en la que quieres
      esconder el mensaje.
     </p>
     <h2>2.- Sube la imagen en la cual quieres esconder el mensaje:</h2>
     <p>
      La imagen puede ser más alta o ancha que la primera imagen, pero no debe
      de ser más chica en ninguno de sus ejes.
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
    en: "Encode Images",
    es: "Codificar Imágenes",
   },
   decode: {
    en: "Decode Image",
    es: "Decodificar Imágenes",
   },
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

 disclaimerModal: {
  header: {
   en: "IMPORTANT MESSAGE",
   es: "MENSAJE IMPORTANTE",
  },
  info: {
   en: (
    <div>
     <h4>Welcome to Stegonosaurus-Rex!</h4>
     <p>
      I'm sure you are very excited to start using this little application I
      created, but first, I would like you to take a very brief minute to read
      this so you are aware of how I am using your valuable user data:
     </p>
     <p style={{ fontWeight: "bold" }}>I'm not.</p>
     <p>
      Stegonosaurus-Rex is not hooked to any data store of any kind. The app
      won't save the images you use for your steganographical creations.
     </p>
     <p>
      Furthermore, the only data the app is going to store in your browser is
      that related to your language preferences and the acknowledgement of this
      message.
     </p>
     <p>
      For the sake of transparency, you can have a look at the whole source code{" "}
      <a href="https://github.com/Geada734/stegonosaurus-rex">here</a>.
     </p>
     <p>
      That's it, for more information, please check the{" "}
      <span style={{ fontStyle: "italic" }}>About</span> and{" "}
      <span style={{ fontStyle: "italic" }}>FAQs</span> sections of this
      application.
     </p>
    </div>
   ),
   es: (
    <div>
     <h4>¡Bienvenido a Stegonosaurus-Rex!</h4>
     <p>
      Estoy seguro de que estás muy emocionad@ por usar esta pequeña aplicación
      que creé, pero primero, me gustaría que te tomaras un breve minuto para
      leer esto solo para que sepas cómo usaré tu valiosa información:
     </p>
     <p style={{ fontWeight: "bold" }}>No lo haré.</p>
     <p>
      Stegonosaurus-Rex no está conectado a ningún tipo de repositorio de datos.
      La aplicación no guardará ninguna imagen que uses para tus creaciones
      esteganográficas.
     </p>
     <p>
      Además, la única información que la aplicación guardará en tu navegador es
      aquella relacionada con tus preferencias de idioma y la aceptación de este
      mensaje.
     </p>
     <p>
      Por transparencia, puedes revisar todo el código fuente de la aplicación{" "}
      <a href="https://github.com/Geada734/stegonosaurus-rex">aquí</a>.
     </p>
     <p>
      Eso es todo, para mayor información, puedes revisar las secciones{" "}
      <span style={{ fontStyle: "italic" }}>Acerca De</span> y{" "}
      <span style={{ fontStyle: "italic" }}>Preguntas Frecuentes</span>.
     </p>
    </div>
   ),
  },

  acknowledgeButton: {
   en: "Acknowledge",
   es: "Aceptar",
  },
 },

 faqs: [
  {
   id: 1,
   en: {
    question: "What is steganography?",
    answer: (
     <span>
      Steganography is the practice of hiding information in media files in a
      way that is not apparent to the casual observer. Usually this information
      can only be retrieved programatically as opposed to with simple natural
      observation.
     </span>
    ),
   },
   es: {
    question: "¿Qué es la esteganografía?",
    answer: (
     <span>
      La esteganografía es la práctica de esconder información en archivos
      multimedia de forma que no sea aparentemente para cualquier observador
      casual. Usualmente, esta información solo puede ser recuperada de forma
      programática, y no por medio de observación natural.
     </span>
    ),
   },
  },
  {
   id: 2,
   en: {
    question: "Are there any practical uses for steganography?",
    answer: (
     <div>
      <span>
       Of course! I'm sure you can come up with some on your own, but here's a
       list anyway:
      </span>
      <ul>
       <li>
        The science behind steganography is also used for watermarking images
        and videos.
       </li>
       <li>
        Steganography can be used to embed data related to the image in the
        image itself.
       </li>
       <li>
        Secret communication with unassuming pictures sure sounds fun, doesn't
        it?
       </li>
       <li>
        It can also be used for a lot of bad stuff I'm definitely not listing.
       </li>
      </ul>
      <span>
       In any case, stegonosaurus and Stegonosaurus-Rex were conceived as a
       fun-oriented project, but I'd be more than happy to hear that this
       project has been useful for anyone.
      </span>
     </div>
    ),
   },
   es: {
    question: "¿Hay algún uso práctico para la esteganografía?",
    answer: (
     <div>
      <span>
       ¡Por supuesto! Estoy seguro de que se les ocurren algunos usos a ustedes,
       pero aquí hay una lista de todas formas:
      </span>
      <ul>
       <li>
        La ciencia detrás de la esteganografía puede ser usada para agregar
        marcas de agua a imágenes y videos.
       </li>
       <li>
        La esteganografía puede embedir información de una imagen dentro de la
        imagen misma.
       </li>
       <li>
        La comunicación secreta utilizando imágenes inocuas suena divertida, ¿no
        es así?
       </li>
       <li>
        También puede usarse para un montón de cosas malas que definitivamente
        no voy a listar.
       </li>
      </ul>
      <span>
       En cualquier caso, tanto stegonosaurus como Stegonosaurus-Rex fueron
       concebidos como un proyecto orientado a la diversión, pero me alegraría
       escuchar que este proyectito le fue útil a alguien.
      </span>
     </div>
    ),
   },
  },
  {
   id: 3,
   en: {
    question: "How do you use this app?",
    answer: (
     <span>
      There are comprehensive instructions on how to use the different
      functionalities Stegonosaurus-Rex has to offer in the "About" page.
     </span>
    ),
   },
   es: {
    question: "¿Cómo se usa la aplicación?",
    answer: (
     <span>
      La página "Acerca De" tiene instrucciones detalladas sobre cómo usar las
      diferentes funcionalidades que Stegonosaurus-Rex ofrece.
     </span>
    ),
   },
  },
  {
   id: 4,
   en: {
    question: "Can I use stegonosaurus in my Python project?",
    answer: (
     <div>
      <span>Of course! Knock yourselves out:</span>
      <ul>
       <li>
        <a href="https://pypi.org/project/stegonosaurus/">PyPI</a>
       </li>
       <li>
        <a href="https://github.com/Geada734/stegonosaurus">Github Repo</a>
       </li>
      </ul>
     </div>
    ),
   },
   es: {
    question: "¿Puedo usar stegonosaurus en mi proyecto de Python?",
    answer: (
     <div>
      <span>¡Claro! Que se diviertan:</span>
      <ul>
       <li>
        <a href="https://pypi.org/project/stegonosaurus/">PyPI</a>
       </li>
       <li>
        <a href="https://github.com/Geada734/stegonosaurus">
         Repositorio de Github
        </a>
       </li>
      </ul>
     </div>
    ),
   },
  },
  {
   id: 5,
   en: {
    question:
     "I am concerned about my personal data getting used without my authorization...",
    answer: (
     <div>
      <span>
       Don't be, Stegonosaurus-Rex is not hooked to any kind of data store. For
       more transparency, you can have a look at the application's source code{" "}
       <a href="https://github.com/Geada734/stegonosaurus-rex">here</a>.
      </span>
     </div>
    ),
   },
   es: {
    question: "Me preocupa que mi información sea usada sin mi autorización...",
    answer: (
     <div>
      <span>
       No te preocupes, Stegonosaurus-Rex no está conectado a ningún sistema de
       almacenamiento de datos. Por transparencia, puedes revisar el código
       fuente <a href="https://github.com/Geada734/stegonosaurus-rex">aquí</a>.
      </span>
     </div>
    ),
   },
  },
 ],
};

export default strings;
