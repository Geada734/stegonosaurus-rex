// Component for the About page text.
import { useContext } from "react";

import AppContext from "../../store/app-context";

import images from "../../static/images/aboutText/index";

import classes from "./style/AboutText.module.css";

function AboutText(props) {
  const appCtx = useContext(AppContext);

  // Index for text in different languages.
  const aboutText = {
    en: (
      <section className={classes.aboutText}>
        <p>
          Stegonosaurus-Rex is a fullstack web application that showcases{" "}
          <a href="https://pypi.org/project/stegonosaurus/">stegonosaurus'</a>
          (Python steganography library) main functionalities, running on a
          headless Flask server (where the magic happens), a Mongo NoSQL
          database, and a React.JS UI.
        </p>
        <p>
          <span className={classes.note}>Note: </span> API calls are secured
          with JWT validation. If you plan to call the API directly, please
          contact the server admin to receive a valid usable token.
        </p>
        <h3>Usage</h3>
        <p>Stegonosaurus-Rex currently provides two usage modes:</p>
        <h6>Encoding</h6>
        <p>
          The user can encode a secret message into any .png multi-band image by
          providing both: the image where the message is going to be hidden in,
          and another .png multi-band image with the message in bright letters
          or lines on a black background.
        </p>
        <div className={classes.imageContainer}>
          <img
            className={classes.normalSizeImg}
            src={images.lenteja}
            alt="template"
          />
          <img
            className={classes.normalSizeImg}
            src={images.coded}
            alt="black"
          />
        </div>
        <p>
          The image containing the message to be encoded{" "}
          <span className={classes.stress}>
            cannot be larger on either axis
          </span>{" "}
          than the image where the message is going to be hidden in.
        </p>
        <div className={classes.imageContainer}>
          <img
            className={classes.largeImg}
            src={images.process}
            alt="process diagram"
          />
        </div>
        <p>
          After both images have been uploaded to the Flask server, the black
          image is going to be searched for the secret message, which will be
          imprinted into the template image. Once the resulting image is saved
          it is very important{" "}
          <span className={classes.stress}>
            not to make any changes to it or the message might be lost
          </span>
          .
        </p>
        <span className={classes.note}>Headless Server Usage</span>
        <p>
          The <span className={classes.note}>/encode </span>
          API can be called directly with the following form body:
        </p>
        <ul>
          <li>
            <span className={classes.note}>coded: </span>
            The image containing the message.
          </li>
          <li>
            <span className={classes.note}>img: </span>
            The image where the message is going to be hidden.
          </li>
          <li>
            <span className={classes.note}>filename: </span>
            Name of the file where the message is going to be hidden.
          </li>
        </ul>
        <p>
          The resulting image will be encoded to base64 and retrievable via the
          <span className={classes.note}> result </span>attribute.
        </p>
        <h6>Decoding</h6>
        <p>
          The user can also decode a message contained within a multi-band .png
          image.
        </p>
        <p>
          Once the image has been uploaded to the Flask server, it is going to
          be scanned to find odd blue values in each pixel. There are two
          decoding modes:
        </p>
        <ul>
          <li>
            <span className={classes.stress}>Transparent </span> mode will show
            the message on top of the original image in bright red.
          </li>
          <li>
            <span className={classes.stress}>Black </span> mode will show the
            message on top of a black background in bright red.
          </li>
        </ul>
        <div className={classes.imageContainer}>
          <img
            className={classes.normalSizeImg}
            src={images.transparent}
            alt="transparent mode"
          />
          <img
            className={classes.normalSizeImg}
            src={images.black}
            alt="black mode"
          />
        </div>
        <span className={classes.note}>Headless Server Usage</span>
        <p>
          The <span className={classes.note}>/decode </span>
          API can be called directly with the following form body:
        </p>
        <ul>
          <li>
            <span className={classes.note}>img: </span>
            The image that contains the hidden message.
          </li>
          <li>
            <span className={classes.note}>img_filename: </span>
            Filename.
          </li>
          <li>
            <span className={classes.note}>mode: </span>
            Decode mode, the only acceptable values for this parameter are "t",
            or "T" for transparent mode, and "b" or "B" for black mode.
          </li>
        </ul>
        <p>
          The resulting image will be encoded to base64 and retrievable via the
          <span className={classes.note}> result </span>attribute.
        </p>
        <div className={classes.thatsIt}>
          <h3>That's it! Have fun!</h3>
        </div>
      </section>
    ),
    es: (
      <section className={classes.aboutText}>
        <p>
          Stegonosaurus-Rex es una aplicación web fullstack que muestra las
          funcionalidades principales de{" "}
          <a href="https://pypi.org/project/stegonosaurus/">stegonosaurus</a>,
          la librería de esteganografía de Python, corriendo sobre un servidor
          headless de Flask (donde ocurre la magia), una base de datos NoSQL de
          Mongo, y una interfaz gráfica creada en React.JS.
        </p>
        <p>
          <span className={classes.note}>Nota: </span> Las llamadas al API del
          servidor de Flask están aseguradas con la validación de JWT. Si
          planeas llamar directamente el API, contacta al administrador del
          servidor para recibir una token válida.
        </p>
        <h3>Modos de Uso</h3>
        <p>Stegonosaurus-Rex actualmente cuenta con dos modos de uso:</p>
        <h6>Codificar</h6>
        <p>
          El usuario puede codificar un mensaje secreto en cualquier imagen .png
          multibanda al proveer la imagen en la cual se ocultará el mensaje, y
          otra imagen .png multibanda con el mensaje en líneas o letras claras
          sobre un fondo negro.
        </p>
        <div className={classes.imageContainer}>
          <img
            className={classes.normalSizeImg}
            src={images.lenteja}
            alt="templeta"
          />
          <img
            className={classes.normalSizeImg}
            src={images.coded}
            alt="foto negra"
          />
        </div>
        <p>
          La imagen que contiene el mensaje secreto{" "}
          <span className={classes.stress}>no debe ser más alta o ancha </span>{" "}
          que la imagen en la que se ocultará el mismo.
        </p>
        <div className={classes.imageContainer}>
          <img
            className={classes.largeImg}
            src={images.process}
            alt="diagrama del proceso"
          />
        </div>
        <p>
          Después de que ambas imágenes sean subidas al servidor, la imagen
          negra será escaneada en busca del mensaje oculto, mismo que será
          impreso en la imagen que se usará de templeta. Una vez que la imagen
          haya sido descargada y guardada es importante{" "}
          <span className={classes.stress}>
            no hacer ningún cambio o el mensaje podría perderse
          </span>
          .
        </p>
        <span className={classes.note}>Uso del Servidor Headless</span>
        <p>
          El API <span className={classes.note}>/encode </span> puede ser
          llamado directamente usando el siguiente cuerpo (form):
        </p>
        <ul>
          <li>
            <span className={classes.note}>coded: </span>
            La imagen que contiene el mensaje.
          </li>
          <li>
            <span className={classes.note}>img: </span>
            La imagen en la cuál será codificado el mensaje.
          </li>
          <li>
            <span className={classes.note}>filename: </span>
            El nombre de la imagen en la cuál se codificará el mensaje.
          </li>
        </ul>
        <p>
          La imagen resultante estará codificada en base 64 en el atributo
          <span className={classes.note}> result</span>.
        </p>
        <h6>Decodificar</h6>
        <p>
          El usuario también puede decodificar mensajes ocultos en una imagen
          .png multibanda.
        </p>
        <p>
          Una vez que la imagen sea subida al servidor, será escaneada para
          buscar números nones en el valor azúl de cada pixel. Hay dos modos de
          decodificación:
        </p>
        <ul>
          <li>
            <span className={classes.stress}>Modo Transparencia </span> mostrará
            el mensaje sobre la imagen original en rojo intenso.
          </li>
          <li>
            <span className={classes.stress}>Modo Negro </span> mostrará el
            mensaje sobre un fondo negro en rojo intenso.
          </li>
        </ul>
        <div className={classes.imageContainer}>
          <img
            className={classes.normalSizeImg}
            src={images.transparent}
            alt="transparent mode"
          />
          <img
            className={classes.normalSizeImg}
            src={images.black}
            alt="black mode"
          />
        </div>
        <span className={classes.note}>Headless Server Usage</span>
        <p>
          El API <span className={classes.note}>/decode </span> puede ser
          llamado directamente usando el siguiente cuerpo (form):
        </p>
        <ul>
          <li>
            <span className={classes.note}>img: </span>
            La imagen que contiene el mensaje oculto.
          </li>
          <li>
            <span className={classes.note}>img_filename: </span>
            Nombre de archivo.
          </li>
          <li>
            <span className={classes.note}>mode: </span>
            Modo de decodificación, los únicos parámetros aceptables son "t" o
            "T" para transparencia, y "b" o "B" para modo negro.
          </li>
        </ul>
        <p>
          La imagen resultante estará codificada en base 64 en el atributo
          <span className={classes.note}> result</span>.
        </p>
        <div className={classes.thatsIt}>
          <h3>¡Eso es todo, diviértanse!</h3>
        </div>
      </section>
    ),
  };

  // This component really is just a bunch of HTML.
  return aboutText[appCtx.language];
}

export default AboutText;
