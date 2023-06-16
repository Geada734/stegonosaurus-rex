// Form creators for the Stegonoserver REST API.

// Creates form for encoding functionality.
export function createEncodingForm(captcha, coded, template, filename) {
  /*
   * captcha: captcha value.
   * coded: image with the message.
   * template: image where the message is to be hidden.
   * filename: filename of the image where the message is to be hidden.
   */
  const formData = new FormData();

  formData.append("captchaValue", captcha);
  formData.append("coded", coded);
  formData.append("img", template);
  formData.append("filename", filename);

  return formData;
}

export function createDecodingForm(captcha, image, filename, mode) {
  /*
   * captcha: captcha value.
   * image: image to decode.
   * filename: filename of the image where the message is to be hidden.
   */
  const formData = new FormData();

  formData.append("captchaValue", captcha);
  formData.append("img", image);
  formData.append("filename", filename);
  formData.append("mode", mode);

  return formData;
}
