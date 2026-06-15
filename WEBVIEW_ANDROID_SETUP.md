# WebView Android Setup Guide for FireDash Tournament

This guide provides complete instructions to wrap your Next.js web app in an Android WebView and compile it into an APK using Capacitor.

## Overview

Capacitor is a framework that wraps web apps (HTML/CSS/JS) in native Android and iOS shells. It provides:
- Native WebView rendering
- Access to Android APIs
- Simple build process
- Zero changes to your React code

## Prerequisites

### System Requirements

1. **Node.js** v18+ 
   ```bash
   node --version  # Check version
   ```

2. **npm** v9+
   ```bash
   npm --version
   ```

3. **Java JDK 17+**
   ```bash
   java -version
   ```
   
   If not installed:
   - **macOS**: `brew install openjdk@17`
   - **Windows**: Download from https://www.oracle.com/java/technologies/downloads/
   - **Linux**: `sudo apt-get install openjdk-17-jdk`

4. **Android SDK** (API 33+)
   - Install via Android Studio
   - Or command line: `sdkmanager "platforms;android-33" "build-tools;34.0.0"`

5. **Android Studio** (recommended, but optional for CLI builds)

### Environment Variables

Set these before building:

```bash
# macOS/Linux
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Windows (PowerShell)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\sdk"
$env:PATH = "$env:PATH;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

Make permanent by adding to your shell config (`.bashrc`, `.zshrc`, etc.) or system environment variables.

## Step 1: Verify Next.js Configuration

Your `next.config.ts` must have `output: 'export'`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // ... other config
};
```

✅ **Your project already has this configured!**

## Step 2: Install Capacitor Dependencies

```bash
npm install
npm install @capacitor/core @capacitor/android @capacitor/cli --save
npm install -D @capacitor/cli
```

Your `package.json` should already include these in the dependencies.

## Step 3: Initialize Capacitor

If Android platform not yet initialized:

```bash
npx cap add android
```

This creates the `android/` directory structure.

## Step 4: Build Next.js for Export

Create the static HTML export that Capacitor will wrap:

```bash
npm run build
```

This generates the `out/` directory with static HTML/CSS/JS.

## Step 5: Sync Capacitor

Copy your web assets to the Android project:

```bash
npx cap sync android
```

## Step 6: Build the APK

### Option A: Command Line (Fastest)

```bash
cd android
./gradlew assembleDebug
cd ..
```

**Output location**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Using Capacitor CLI

```bash
npx cap build android
```

### Option C: Android Studio GUI

```bash
npx cap open android
```

Then in Android Studio:
1. Click **Build** → **Build Bundle(s)/APK(s)** → **Build APK(s)**
2. Wait for completion

## Step 7: Install on Device/Emulator

### Emulator

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd <emulator_name>

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Physical Device

1. Enable **Developer Mode** on device
2. Enable **USB Debugging** in Developer Options
3. Connect via USB cable
4. Install:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Project Structure

```
firedash-tournament-/
├── next.config.ts              (output: 'export' ✓)
├── capacitor.config.ts         (app config)
├── package.json                (Capacitor deps)
├── out/                        (Generated: static export)
├── android/                    (Generated: Android project)
│   ├── app/
│   │   ├── build.gradle        (Build configuration)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/com/firedash/tournament/MainActivity.java
│   ├── build.gradle
│   ├── gradle.properties
│   ├── gradlew                 (Gradle wrapper - Linux/macOS)
│   ├── gradlew.bat             (Gradle wrapper - Windows)
│   └── settings.gradle
├── src/                        (React/Next.js source)
└── REAL_APK_BUILD.sh          (Automated build script)
```

## Configuration Files Explained

### capacitor.config.ts

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.firedash.tournament',      // Unique app identifier
  appName: 'FireDash Tournament',         // Display name
  webDir: 'out',                         // Where to find static files
  server: {
    androidScheme: 'https',              // HTTPS support
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,             // Hide splash after load
    },
  },
};

export default config;
```

### android/app/build.gradle

Key sections:
- `minSdk 33` - Minimum Android version
- `targetSdk 34` - Target Android version
- `dependencies { ... }` - Android libraries

### android.properties

Build configuration:
- `minSdk=33` - Minimum SDK
- `targetSdk=34` - Target SDK
- `buildToolsVersion=34.0.0` - Build tools
- `javaSourceCompatibility=17` - Java version

## Customization

### App Name & Icon

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    ...>
```

### Permissions

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### App Icon

Replace `android/app/src/main/res/mipmap-*` with your icons (various sizes).

### Splash Screen

Edit `android/app/src/main/res/values/styles.xml` for splash behavior.

## Troubleshooting

### "ANDROID_HOME not set"

```bash
echo $ANDROID_HOME  # Check if set
export ANDROID_HOME=$HOME/Library/Android/sdk  # Set it
```

### "gradlew permission denied"

```bash
chmod +x android/gradlew
```

### "Java not found"

```bash
java -version
# If not found, install JDK 17+
brew install openjdk@17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Build fails with "no Android SDK found"

```bash
# Install Android SDK
sdkmanager --list
sdkmanager "platforms;android-33"
sdkmanager "build-tools;34.0.0"
```

### WebView shows blank page

1. Check `capacitor.config.ts` has correct `webDir: 'out'`
2. Run `npm run build` to generate `out/` directory
3. Run `npx cap sync android` to copy files
4. Clean and rebuild: `cd android && ./gradlew clean && ./gradlew assembleDebug`

### APK too large

Enable ProGuard minification in `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

## Automated Build

Use the provided script for one-command building:

```bash
bash REAL_APK_BUILD.sh
```

This script:
1. Checks all prerequisites
2. Installs dependencies
3. Builds Next.js
4. Syncs Capacitor
5. Builds Android APK
6. Verifies output
7. Copies to `APK_DOWNLOAD/`

## Release APK (Production)

For Google Play Store:

```bash
cd android
./gradlew assembleRelease
cd ..
```

**Note**: Requires signing configuration. See Google Play documentation for details.

## Next.js to Android Workflow

```bash
# 1. Make changes to your React code
# 2. Build static export
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Build APK
cd android && ./gradlew assembleDebug && cd ..

# 5. Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Useful Commands

```bash
# Full workflow in one command
npm install && npm run build && npx cap sync android && cd android && ./gradlew assembleDebug && cd ..

# Check Java version
java -version

# Check Android SDK
sdkmanager --list

# List connected devices
adb devices

# View device logs
adb logcat

# Clear app data
adb shell pm clear com.firedash.tournament

# Get app info
adb shell dumpsys package com.firedash.tournament

# Uninstall app
adb uninstall com.firedash.tournament
```

## Testing APK

### Install APK

```bash
adb install APK_DOWNLOAD/app-debug.apk
```

### Launch App

```bash
adb shell am start -n com.firedash.tournament/.MainActivity
```

### View Real-time Logs

```bash
adb logcat | grep -i firedash
```

### Debug

For debugging in Chrome DevTools:
1. In Android, enable USB Debugging
2. Connect device
3. In Chrome: `chrome://inspect`
4. Select device and inspect WebView

## Reference

- **Capacitor Docs**: https://capacitorjs.com/docs/android
- **Android Studio**: https://developer.android.com/studio
- **Gradle**: https://gradle.org/
- **Next.js Export**: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

## Support

If you encounter issues:

1. Check Android Studio SDK Manager (Tools → SDK Manager)
2. Verify environment variables are set
3. Run `cd android && ./gradlew clean` before rebuilding
4. Check `android/build.log` for detailed error messages
5. See troubleshooting section above

---

**Your project is ready for APK compilation!** 🚀

Run the automated build:
```bash
bash REAL_APK_BUILD.sh
```

Or follow steps 1-6 manually for more control.
