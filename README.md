# Stegonosaurus-Rex

*Server Version: 1.2.0*

*UI Version: 1.0.1*

Stegonosaurus-Rex is a fullstack web application created to showcase the functionalities of the [stegonosaurus](https://pypi.org/project/stegonosaurus/) Python library. The app mainly consists of two components:

- A headless Flask server that can be queried from anywhere (provided a valid token is used) to make use of the stegonosaurus functions.
- A friendly React UI which queries the aforementioned Flask server, so the user doesn't have to use curl commands or Postman.

While Stegonosaurus-Rex is not currently running on the internet, developers are more than welcomed to download and set the application as they please.

## Requirements

- Python3 (3.7.2 or later)
- Yarn
- A Mongo Atlas connection to be used by the server with Pymongo. ([More Info](https://medium.com/analytics-vidhya/connecting-to-mongodb-atlas-with-python-pymongo-5b25dab3ac53))
- A ReCaptcha Ver. 3 Connection ([More Info](https://developers.google.com/recaptcha/intro))

## Installing the Backend

Both the "stegonoserver" and "stegonoscreens" require some specific values to be provided in the form of config.json files. For the backend create a "config" folder in the stegonoserver directory at the same level as the "app" folder. Inside the config folder create a new json file called "config". The contents should follow this format:
```
{
    "host": <host where the app is going to be deployed, 0.0.0.0 by default>,
    "port": <port of the host where the app is going to be listenning on, 5000 by default>,
    "mongoServer": <Mongo Atlas URL to the DB>,
    "captchaSecret": <Captcha key to use in validations>,
    "captchaUrl": <Captcha host>,
    "jwtSecret": <Whatever string you want to use to sign the JWT in the requests>,
    "jwtLifeMinutes": <How long the JWT is valid in minutes>
}
```
