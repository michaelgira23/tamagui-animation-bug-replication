'use client'

import { animationDriver, Button, H2, Paragraph, SizableText, XStack, YStack } from '@my/ui'
import { useState } from 'react'

const delays = [0, 1000, 2000, 3000]

export function HomeScreen() {
  const [mountKey, setMountKey] = useState(0)

  return (
    <YStack flex={1} justify="center" items="center" gap="$6" p="$4" bg="$background">
      <YStack gap="$2" maxW={360}>
        <H2 text="center">Delayed enterStyle</H2>
        <SizableText size="$5" fontWeight="600" text="center">
          {animationDriver}
        </SizableText>
        <Paragraph color="$color10" text="center">
          Each row should stay hidden for its delay, then fade and slide in.
        </Paragraph>
      </YStack>

      <YStack key={mountKey} gap="$3" width={280}>
        {delays.map((delay) => (
          <XStack
            key={delay}
            enterStyle={{ opacity: 0, y: 20 }}
            transition={['lazy', { delay }]}
            justify="space-between"
            items="center"
            px="$4"
            py="$3"
            rounded="$4"
            bg="$color3"
          >
            <SizableText>{delay ? 'Delayed' : 'No delay'}</SizableText>
            <SizableText color="$color10">{delay}ms</SizableText>
          </XStack>
        ))}
      </YStack>

      <Button onPress={() => setMountKey((key) => key + 1)}>
        Replay
      </Button>
    </YStack>
  )
}
