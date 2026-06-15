# Quick Start: Build Android APK

## 5-Minute Setup

### Prerequisites Check

```bash
# All must return versions
node --version      # v18+ required
npm --version       # v9+ required
java -version       # 17+ required
echo $ANDROID_HOME  # Must be set
```

### One-Command Build

```bash
bash REAL_APK_BUILD.sh
```

**That's it!** Your APK will be at:
- `APK_DOWNLOAD/app-debug.apk`
- `.build-outputs/app-debug.apk`

## Install on Device

```bash
adb install APK_DOWNLOAD/app-debug.apk
```

## Install on Emulator

```bash
# Start emulator first
emulator -avd <device_name>

# Then install
adb install APK_DOWNLOAD/app-debug.apk
```

## What Just Happened?

The build script:
1. ✓ Installed npm dependencies
2. ✓ Built Next.js static export
3. ✓ Initialized Android project (if needed)
4. ✓ Synced web files to Android
5. ✓ Compiled Android APK with Gradle
6. ✓ Verified APK is valid (>1MB)
7. ✓ Copied to download folders

## Troubleshooting

### "Command not found: bash"
Use: `sh REAL_APK_BUILD.sh` (Windows Git Bash) or `./REAL_APK_BUILD.sh` (Unix)

### "ANDROID_HOME not set"
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# or
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\sdk"  # Windows
```

### "Build failed"
Check the full guide: `WEBVIEW_ANDROID_SETUP.md`

## Next Steps

- See `WEBVIEW_ANDROID_SETUP.md` for detailed configuration
- Modify app name/icon in `android/app/src/main/AndroidManifest.xml`
- Test on device with: `adb logcat`

## Project Info

| Property | Value |
|----------|-------|
| App ID | com.firedash.tournament |
| App Name | FireDash Tournament |
| Min SDK | 33 (Android 13) |
| Target SDK | 34 (Android 14) |
| Java Version | 17 |

**Ready to go!** 🚀
