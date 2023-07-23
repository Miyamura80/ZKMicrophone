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
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID ? process.env.ALCHEMY_ID : "" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'TwinCircuits',
  projectId: 'b45b212d204525704dde4bd05eee22aa',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

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
