# Tamagui reanimated driver: delayed `enterStyle` shows the final value during the delay

Reproduction built on [tamagui/starter-free](https://github.com/tamagui/starter-free), with Tamagui 2.7.7, the `@tamagui/animations-reanimated` driver on native, and Expo SDK 57 so it runs in Expo Go.

```tsx
<XStack enterStyle={{ opacity: 0, y: 20 }} transition={['lazy', { delay: 1000 }]} />
```

- **Expected:** the view stays at `enterStyle` (hidden) for the delay, then animates in.
- **Actual:** the view renders at its final value immediately, snaps back to `enterStyle` when the delay ends, then animates in.

The screen is [`packages/app/features/home/screen.tsx`](packages/app/features/home/screen.tsx). Tap **Replay** to remount the rows.

## Run it

```sh
yarn
cd apps/expo
npx expo start --go
```

Scan the QR code with Expo Go (SDK 57). `--go` is needed because the starter includes `expo-dev-client`.

## Recordings

iOS 27 simulator, Expo Go 57, tapping Replay. All three side by side: [media/comparison.mp4](media/comparison.mp4).

| Driver | Recording |
|---|---|
| `@tamagui/animations-react-native` (for comparison, on the [`react-native-driver`](../../tree/react-native-driver) branch) | [media/react-native-driver.mp4](media/react-native-driver.mp4): delayed rows stay hidden until their delay ends, but each delay runs twice as long (a separate bug, see below) |
| `@tamagui/animations-reanimated` 2.7.7 | [media/reanimated-driver.mp4](media/reanimated-driver.mp4): delayed rows show immediately, vanish when their delay ends, then fade in |
| `@tamagui/animations-reanimated` with the fix | [media/reanimated-driver-fixed.mp4](media/reanimated-driver-fixed.mp4): delayed rows stay hidden until their delay ends |

The fixed recording runs [michaelgira23/tamagui@animation-fix](https://github.com/michaelgira23/tamagui/tree/animation-fix), which applies `withDelay` before the `enterStyle` seed in `applyAnimation`, linked in with [`lllink`](https://github.com/tamagui/tamagui/blob/main/CONTRIBUTING.md). Metro also needs that checkout's `code/` in `watchFolders` to serve its font assets.

The React Native driver's delays run twice as long because it wraps the spring in `Animated.sequence([Animated.delay(delay), spring])` while also passing `delay` in the spring's own config.
