import { defineConfig } from '@wagmi/cli'
import { react, foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    react({
      useContractRead: true,
      useContractFunctionRead: true,
    }),
    foundry({
      project: '../../tb_projects/dfx',
      artifacts: 'artifacts/contracts/',
      include: [
          'ParisStorage.json',
          'PairInfos.json',
          'Trading.json',
          'TradingStorage.json',
          'Aggregator.json',
          'TradingCallbacks.json',
          'Vault.json',
      ]
    })
  ],
})
