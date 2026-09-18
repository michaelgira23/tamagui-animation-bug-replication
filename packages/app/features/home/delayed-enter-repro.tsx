import { Button, Paragraph, YStack } from '@my/ui'
import { useState } from 'react'

// Each row should stay invisible for its delay, then fade and slide in.
// With the Reanimated driver, the delayed rows appear immediately, vanish when
// their delay ends, then animate in.
export function DelayedEnterRepro() {
  const [mountKey, setMountKey] = useState(0)

  return (
    <YStack gap="$2" items="center">
      <YStack key={mountKey} gap="$2">
        {[0, 1000, 2000, 3000].map((delay) => (
          <Paragraph
            key={delay}
            enterStyle={{ opacity: 0, y: 20 }}
            transition={['lazy', { delay }]}
          >
            {delay ? `delay: ${delay}ms` : 'no delay'}
          </Paragraph>
        ))}
      </YStack>
      <Button onPress={() => setMountKey((key) => key + 1)}>Replay</Button>
    </YStack>
  )
}
