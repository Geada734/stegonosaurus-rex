// Index for all the possible handled errors.
import config from "../configs/config.json";

const errors = {
  imgTooLarge: {
    code: "ERR01",
    en: {
      summary: "The image is too large",
      message:
        "Please submit files smaller than " + config.imageSizeDisplay + ".",
    },
    es: {
      summary: "La imagen es demasiado grande",
      message:
        "Por favor, sube archivos más pequeños de " +
        config.imageSizeDisplay +
        ".",
    },
  },
  wrongFormat: {
    code: "ERR02",
    en: {
      summary: "Wrong Image Format",
      message: "All uploaded images must be multi-band .png files.",
    },
    es: {
      summary: "Formato Incorrecto",
      message: "Todas las imágenes subidas deben ser archivos .png multibanda.",
    },
  },
  wrongSize: {
    code: "ERR03",
    en: {
      summary: "Wrong File Sizes",
      message:
        "The image with the message shouldn't be larger in either axis " +
        "than the image to use for encoding.",
    },
    es: {
      summary: "Tamaños de archivo incorrectos",
      message:
        "La imagen que contiene el mensaje no debe ser más grande en ningún eje " +
        "que la imagen que se usará para codificar.",
    },
  },
  serverDown: {
    code: "ERR06",
    en: {
      summary: "Server Down",
      message: "The server is currently down, try again later.",
    },
    es: {
      summary: "Servidor No Disponible",
      message:
        "El servidor no se encuentra disponible en este momento, intenta de nuevo más tarde.",
    },
  },
  unknown: {
    code: "ERR99",
    en: {
      summary: "Something went wrong...",
      message: "There has been an unknown error, please try again later.",
    },
    es: {
      summary: "Algo salió mal...",
      message: "Ocurrió un error desconocido, por favor inténtalo más tarde.",
    },
  },
};

export default errors;
