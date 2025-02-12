# Gen4Olive Mobile

Brief description of the project.

## Requirements

Make sure you have installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) (we use npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if you haven't already installed it, you can do so with `npm install -g expo-cli`)

## Starting the App

1. **Clone the repository**:
    ```bash
    git clone https://github.com/SystemsLab-Sapienza/Gen4Olive-Mobile.git
    cd Gen4Olive-Mobile
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the app**:
    ```bash
    npm start
    ```
    This will open a window in your browser with the Expo control panel. You can then scan the QR code with the Expo Go app on your mobile device to view the app.

## Updating Packages

To keep the project up-to-date, you can follow these steps:

1. **Check the current versions**:
    ```bash
    npm outdated
    ```

2. **Update the packages**:
    ```bash
    npm update
    ```

3. **Update Expo SDK**:
    ```bash
    expo upgrade
    ```

5. **Clear the cache (optional)**:
    ```bash
    npm start -- --reset-cache
    ```

## Building the App

1. **Install eas-cli**:
    ```bash
    npm install -g eas-cli
    ```

2. **Expo account Login**:
    ```bash
    eas login
    ```

3. **Create a build**:
    - Android Play Store build (AAB)
        ```bash
        eas build --platform android
        ```
    - Android internal distribution build (APK)
        ```bash
        eas build --platform android --profile preview
        ```

4. **Download build**:
    ```bash
    https://expo.dev/
    ```