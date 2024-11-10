# Downloading Expo

Expo is an open-source platform for building universal native apps for Android, iOS, and the web using JavaScript and React. It provides tools and services that streamline the development process and eliminate the need to deal with native code for most features. We chose Expo for its simplicity and robust managed workflow.

## Prerequisites
- Node.js (Download from [Node.js Official Site](https://nodejs.org/))
- npm or yarn (comes with Node.js installation)

## Installing Expo
1. Install the Expo CLI globally using npm:
```bash
npm install -g expo-cli
```

2. Create a new Expo project:
```bash
expo init FinancialTracker
```

3. Navigate to your project directory:
```bash
cd FinancialTracker
```

4. Start the development server:
```bash
expo start
```

5. Install the Expo Go app on your mobile device:
   - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Expo Go for iOS](https://apps.apple.com/app/expo-go/id982107779)


## Testing
1. Scan the QR code displayed in the terminal using the Expo Go app.
2. If testing on a simulator or emulator:
   - For iOS: Press `i` to open the app in an iOS simulator (macOS required).
   - For Android: Press `a` to open the app in an Android emulator.
