import * as React from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient, useAccount, useConnect, useContract, WagmiConfig } from 'wagmi'
import { arbitrum, foundry, mainnet, polygon, localhost, Chain } from 'wagmi/chains'
import { Web3Modal, Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import Box from '@mui/material/Box';

export default function WalletBar() {
    return (
        <Box sx={{ display: 'inline-flex' }}>
          <Web3NetworkSwitch />&nbsp;
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
        </Box>
    );
}