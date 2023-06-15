export function createEncodingForm(captcha, coded, message, filename) {
  const formData = new FormData();

  formData.append("captchaValue", captcha);
  formData.append("coded", coded);
  formData.append("img", message);
  formData.append("filename", filename);

  return formData;
}

export function createDecodingForm(captcha, image, filename, mode) {
  const formData = new FormData();

  formData.append("captchaValue", captcha);
  formData.append("img", image);
  formData.append("filename", filename);
  formData.append("mode", mode);

  return formData;
}
