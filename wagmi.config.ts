import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'

export default defineConfig({
    out: 'audio-player/generated.ts',
    plugins: [
        foundry({
            deployments: {
            },
            project: './contracts',
        }),
        react(),
    ],
})
