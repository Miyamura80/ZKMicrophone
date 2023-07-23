import { useState } from 'react';
import Navbar from '../components/Navbar';
import Browse from '../components/Browse';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  foundry,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { createClient } from 'viem';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient } = configureChains([
  mainnet, goerli, foundry
],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID ? process.env.ALCHEMY_ID : "" }),
    alchemyProvider({ apiKey: "9dYGu1LxUcjdAQV2TTULpv0xdm6QYNDw" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'TwinCircuits',
  projectId: '78133656167d49ae79272d2a60d3eb0d',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

// const client = createClient({
//   autoConnect: true,
//   connectors({ goerli.id
// }) {
//   const chain = chains.find((x) => x.id === chainId) ?? defaultChain
//     const rpcUrl = chain.rpcUrls.alchemy
//     ? `${chain.rpcUrls.alchemy}/${alchemyId}`
//     : chain.rpcUrls.default
//     return [
//       new MetaMaskConnector({ chains }),
//     ]
//   },
// })

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <HomePage />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      {/* <Browse /> */}
    </div>
  );
};

export default App;
