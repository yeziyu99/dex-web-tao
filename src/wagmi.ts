import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet, foundry, localhost } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, foundry, localhost],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (localhost) => ({
        http: `127.0.0.1:8545`,
        webSocket: `ws://127.0.0.1:8545`,
      }),
    }),
  ],
)

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
