@echo off
REM FireDash Tournament - Android APK Build Script for Windows
REM This script automates the process of building an Android APK

echo =========================================
echo FireDash Tournament - APK Builder
echo =========================================
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    exit /b 1
)
echo [OK] Node.js found

where java >nul 2>nul
if errorlevel 1 (
    echo ERROR: Java is not installed
    exit /b 1
)
echo [OK] Java found

if "%ANDROID_HOME%"==" (
    echo ERROR: ANDROID_HOME environment variable not set
    exit /b 1
)
echo [OK] ANDROID_HOME is set

echo.
echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Building Next.js project...
call npm run build

echo.
echo Step 3: Checking for Android project...
if not exist "android" (
    echo Android project not found. Initializing...
    call npx cap add android
)
echo [OK] Android project ready

echo.
echo Step 4: Syncing Capacitor...
call npx cap sync android

echo.
echo Step 5: Building Android APK...
cd android
call gradlew.bat assembleDebug
cd ..

echo.
echo =========================================
echo [SUCCESS] APK Build Complete!
echo =========================================

set "APK_PATH=android\app\build\outputs\apk\debug\app-debug.apk"
if exist "%APK_PATH%" (
    echo APK Location: %APK_PATH%
    echo.
    echo Next steps:
    echo   1. Install on emulator: adb install %APK_PATH%
    echo   2. Install on device: Connect device via USB and run: adb install %APK_PATH%
    echo   3. View logs: adb logcat
) else (
    echo ERROR: APK not found at expected location
    exit /b 1
)

pause
