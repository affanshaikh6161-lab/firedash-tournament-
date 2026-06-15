#!/bin/bash

# Real APK Build Script for FireDash Tournament
# This script performs the complete real Android APK build using Gradle

set -e

echo "=========================================="
echo "FireDash Tournament - REAL APK Builder"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track start time
START_TIME=$(date +%s)

# Step 1: Check prerequisites
echo -e "${YELLOW}[1/10] Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Java found: $(java -version 2>&1 | head -n 1)${NC}"

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${RED}❌ ANDROID_HOME environment variable not set${NC}"
    echo "Set it with: export ANDROID_HOME=\$HOME/Library/Android/sdk"
    exit 1
fi
echo -e "${GREEN}✓ ANDROID_HOME is set: $ANDROID_HOME${NC}"

echo ""
echo -e "${YELLOW}[2/10] Installing npm dependencies...${NC}"
npm install --legacy-peer-deps 2>&1 | tail -20
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo ""
echo -e "${YELLOW}[3/10] Building Next.js project...${NC}"
npm run build 2>&1 | tail -30
echo -e "${GREEN}✓ Next.js build complete${NC}"

echo ""
echo -e "${YELLOW}[4/10] Checking for Android project...${NC}"
if [ ! -d "android" ]; then
    echo -e "${YELLOW}  Android project not found. Creating...${NC}"
    npx cap add android 2>&1 | tail -10
fi
echo -e "${GREEN}✓ Android project ready${NC}"

echo ""
echo -e "${YELLOW}[5/10] Syncing Capacitor...${NC}"
npx cap sync android 2>&1 | tail -10
echo -e "${GREEN}✓ Capacitor synced${NC}"

echo ""
echo -e "${YELLOW}[6/10] Making gradlew executable...${NC}"
if [ -f "android/gradlew" ]; then
    chmod +x android/gradlew
    echo -e "${GREEN}✓ gradlew is executable${NC}"
else
    echo -e "${RED}❌ gradlew not found${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}[7/10] Cleaning Android build...${NC}"
cd android
./gradlew clean 2>&1 | tail -20
cd ..
echo -e "${GREEN}✓ Android build cleaned${NC}"

echo ""
echo -e "${YELLOW}[8/10] Building Android debug APK...${NC}"
cd android
timeout 3600 ./gradlew assembleDebug --no-daemon 2>&1 | tee build.log | tail -50
GRADLE_EXIT=${PIPESTATUS[1]}
cd ..

if [ $GRADLE_EXIT -ne 0 ]; then
    echo -e "${RED}❌ Gradle build failed${NC}"
    echo "Build log saved to android/build.log"
    exit 1
fi
echo -e "${GREEN}✓ Gradle build completed${NC}"

echo ""
echo -e "${YELLOW}[9/10] Verifying APK output...${NC}"

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

if [ ! -f "$APK_PATH" ]; then
    echo -e "${RED}❌ APK not found at: $APK_PATH${NC}"
    
    # Check alternative locations
    echo -e "${YELLOW}Searching for APK files...${NC}"
    find android -name "*.apk" -type f 2>/dev/null || echo "No APK files found"
    exit 1
fi

APK_SIZE=$(stat -f%z "$APK_PATH" 2>/dev/null || stat -c%s "$APK_PATH" 2>/dev/null || du -b "$APK_PATH" | cut -f1)
APK_SIZE_MB=$(echo "scale=2; $APK_SIZE / 1048576" | bc)

if [ $(echo "$APK_SIZE < 1048576" | bc) -eq 1 ]; then
    echo -e "${RED}❌ APK is too small (${APK_SIZE_MB} MB). Build may have failed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ APK verified${NC}"
echo -e "${GREEN}  Location: $APK_PATH${NC}"
echo -e "${GREEN}  Size: ${APK_SIZE_MB} MB (${APK_SIZE} bytes)${NC}"

echo ""
echo -e "${YELLOW}[10/10] Copying APK to output directories...${NC}"

# Create output directories
mkdir -p .build-outputs
mkdir -p APK_DOWNLOAD

# Copy to both locations
cp "$APK_PATH" .build-outputs/app-debug.apk
cp "$APK_PATH" APK_DOWNLOAD/app-debug.apk

echo -e "${GREEN}✓ APK copied to .build-outputs/app-debug.apk${NC}"
echo -e "${GREEN}✓ APK copied to APK_DOWNLOAD/app-debug.apk${NC}"

# Verify the copies
COPY1_SIZE=$(stat -f%z ".build-outputs/app-debug.apk" 2>/dev/null || stat -c%s ".build-outputs/app-debug.apk" 2>/dev/null || du -b ".build-outputs/app-debug.apk" | cut -f1)
COPY2_SIZE=$(stat -f%z "APK_DOWNLOAD/app-debug.apk" 2>/dev/null || stat -c%s "APK_DOWNLOAD/app-debug.apk" 2>/dev/null || du -b "APK_DOWNLOAD/app-debug.apk" | cut -f1)

if [ $COPY1_SIZE -lt 1048576 ] || [ $COPY2_SIZE -lt 1048576 ]; then
    echo -e "${RED}❌ Copied APKs are invalid or too small${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Both APK copies verified${NC}"
echo -e "${GREEN}  .build-outputs/app-debug.apk: $(echo "scale=2; $COPY1_SIZE / 1048576" | bc) MB${NC}"
echo -e "${GREEN}  APK_DOWNLOAD/app-debug.apk: $(echo "scale=2; $COPY2_SIZE / 1048576" | bc) MB${NC}"

# Calculate build time
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo ""
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}✓✓✓ REAL APK BUILD SUCCESSFUL! ✓✓✓${NC}"
echo -e "${GREEN}==========================================${NC}"
echo ""
echo -e "${GREEN}Build completed in ${MINUTES}m ${SECONDS}s${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Download: APK_DOWNLOAD/app-debug.apk"
echo "  2. Install on emulator: adb install APK_DOWNLOAD/app-debug.apk"
echo "  3. Install on device: adb install APK_DOWNLOAD/app-debug.apk"
echo "  4. View logs: adb logcat"
echo ""
echo -e "${GREEN}APK Details:${NC}"
echo "  App ID: com.firedash.tournament"
echo "  App Name: FireDash Tournament"
echo "  Min SDK: 33"
echo "  Target SDK: 34"
echo ""
