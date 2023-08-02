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

## Installing the Server

Both the "stegonoserver" and "stegonoscreens" require some specific values to be provided in the form of config.json files. For the backend create a "config" folder in the stegonoserver directory at the same level as the "app" folder. Inside the config folder create a new json file called "config.json". The contents should follow this format:
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
Once the config file has been created, the dependencies need to be installed. There is a "requirements.txt" file that should be used to install the necessary libraries for the server to work, from the "stegonoserver" folder, run the following command:

`pip install -r requirements.txt`

*Note: It is recommended to install the dependencies inside a virtual environment. My personal preference is [venv](https://docs.python.org/3/library/venv.html).*

## Running the Server

If the config file is now in the project, and the dependencies have been installed, use the following command to bring the server up:

`python3 app/src/stegonoserver.py`

The server is now ready to be queried.

## Populating the MongoDB

From the "stegonoserver" folder, run the following command:

`python3 tools/db_builder.py`

*Note: I know it's very unlikely, but make sure there are no dbs called "stegonodb" you don't want to be overwritten in your Mongo Atlas cluster.*

## Unit Testing the Server

At the stegonoserver level run the following command:

`pytest`

If any of the tests fail, repeat the previous steps or look at the following section (issues will be added as they arise or are reported).

## Troubleshooting the Server Installation

Some Windows machines might present an issue when installing the contents of the "requirements.txt" file with the Flask-Cors dependency.

Simply install this dependency separately after the rest has finished installing:

`pip install flask-cors`

## Installing the UI

As with the server, the first step is to create the config files. Add a new "configs" (mind the "s") folder in the src directory inside "stegonoscreens", and inside place the "config.json" file with this format:

```
{
    "stegonoServer": <URL to your server>,
    "siteKey": <Captcha site key>",
    "imageSizeLimit": <Largest size the front end inputs can allow>,
    "imageSizeDisplay": <How to display this size to the users>
}
```
Once the config file has been created, run the following command at the stegonoscreens level to install all the required dependencies:

`yarn install`

## Running the UI

To run the development version of the UI, just run the following command at the stegonoscreens level:

`yarn start`

The app should open automatically in your default browser.

## Unit Testing the UI

The UI has a thorough test suite which can be run at stegonoscreens level with the following command:

`yarn test`

If any of the tests fail, repeat the installation steps.

## Building the UI for Production and Serving

To build a webpack bundle just run the following command at stegonoscreens level:

`yarn build`

You can serve the resulting bundle with the server of your choice, my personal preference (and Yarn's suggestion) is [serve](https://yarnpkg.com/package/serve).

## Troubleshooting the UI Instalation

Ubuntu machines might experience an error when installing the dependencies and building the app.

These issues can be avoided by running the yarn commands as follows:

`yarn <command> --ignore-engines`

## Usage

Detailed instructions are included in the "About" page in the UI.

## Use Steganography Responsibly

And enjoy!
