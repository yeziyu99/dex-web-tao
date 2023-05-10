import * as React from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { configureChains, createClient, useAccount, useConnect, useContract, WagmiConfig } from 'wagmi'
import { arbitrum, foundry, mainnet, Chain } from 'wagmi/chains'
import { tradingABI, useTradingIsDone, useTradingMaxPosDai } from './generated'
import { Container, Box } from '@mui/material';
import WalletBar from './components/WalletBar';
import TradingPage from './components/TradingPage';
import OrdersPage from './components/OrdersPage';
import './chartmain.js';

const devChain = {
  id: 37139,
  name: 'devChain',
  network: 'devChain',
  nativeCurrency: {
    decimals: 18,
    name: 'ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://152.32.198.202:8545'] },
    default: { http: ['http://152.32.198.202:8545'] },
  }
} as const satisfies Chain

// 1. Set projectID
const projectId = 'dba7331053371470365be9206718fb4d';

// 2. Configure wagmi client
const chains = [foundry, devChain]
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> component
export function App() {     
  // const {isConnected } = useAccount()
  // const isDone = useTradingMaxPosDai({
  //   address: '0x422527176F8b33977364A2D5aBb332E2E49f21Ce',
  // })

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Container maxWidth="xl" sx={{ my: 1, display: 'inline-flex' }}>
          <Container maxWidth="xs"></Container>
          <WalletBar />
        </Container>

        <Container maxWidth="xl" sx={{ my: 1, display: 'inline-flex' }}>
          <Container id="tv_chart_container" maxWidth="md" sx={{ my: 0 }}>
          </Container>
          <TradingPage />
        </Container>

        <OrdersPage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}