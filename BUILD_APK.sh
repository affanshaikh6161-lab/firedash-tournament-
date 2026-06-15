#!/bin/bash

# FireDash Tournament - Android APK Build Script
# This script automates the process of building an Android APK

set -e

echo "=========================================="
echo "FireDash Tournament - APK Builder"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"

if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Java found${NC}"

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${RED}❌ ANDROID_HOME environment variable not set${NC}"
    exit 1
fi
echo -e "${GREEN}✓ ANDROID_HOME is set${NC}"

echo ""
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install

echo ""
echo -e "${YELLOW}Step 2: Building Next.js project...${NC}"
npm run build

echo ""
echo -e "${YELLOW}Step 3: Checking for Android project...${NC}"
if [ ! -d "android" ]; then
    echo -e "${YELLOW}  Android project not found. Initializing...${NC}"
    npx cap add android
fi
echo -e "${GREEN}✓ Android project ready${NC}"

echo ""
echo -e "${YELLOW}Step 4: Syncing Capacitor...${NC}"
npx cap sync android

echo ""
echo -e "${YELLOW}Step 5: Building Android APK...${NC}"
cd android
./gradlew assembleDebug
cd ..

echo ""
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}✓ APK Build Successful!${NC}"
echo -e "${GREEN}==========================================${NC}"

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "${GREEN}APK Location: $APK_PATH${NC}"
    echo -e "${GREEN}APK Size: $APK_SIZE${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Install on emulator: adb install $APK_PATH"
    echo "  2. Install on device: Connect device via USB and run: adb install $APK_PATH"
    echo "  3. View logs: adb logcat"
else
    echo -e "${RED}❌ APK not found at expected location${NC}"
    exit 1
fi
