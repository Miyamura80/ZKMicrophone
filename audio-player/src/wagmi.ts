import { Chain, configureChains, createConfig } from 'wagmi'
import { foundry, goerli, mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '78133656167d49ae79272d2a60d3eb0d'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet, goerli, foundry
    ],
    [
        publicProvider(),
    ],
)

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        // new CoinbaseWalletConnector({
        //     chains,
        //     options: {
        //         appName: 'wagmi',
        //     },
        // }),
        // new WalletConnectConnector({
        //     chains,
        //     options: {
        //         projectId: walletConnectProjectId,
        //     },
        // }),
        // new InjectedConnector({
        //     chains,
        //     options: {
        //         name: 'Injected',
        //         shimDisconnect: true,
        //     },
        // }),
    ],
    publicClient,
    webSocketPublicClient,
})
