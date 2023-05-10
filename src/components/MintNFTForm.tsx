import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'use-debounce'
import { BigNumber } from 'ethers'

export function MintNFTForm() {
    const [tokenId, setTokenId] = React.useState('')
    const debouncedTokenId = useDebounce(tokenId, 500)

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0x422527176F8b33977364A2D5aBb332E2E49f21Ce',
        abi: [
            {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                  }
                ],
                "name": "setMaxPosDai",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        functionName: 'setMaxPosDai',
        args: [tokenId ? BigNumber.from(tokenId) : BigNumber.from(0)],
        enabled: Boolean(debouncedTokenId),
    })
    
    const {data, error, isError, write } = useContractWrite(config)
    const { isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <form
        onSubmit={(e) => {
            e.preventDefault()
            write?.()
        }}
        >
            <label htmlFor="tokenId">Token ID</label>
            <input 
                id="tokenId"
                onChange={(e) => setTokenId(e.target.value)}
                placeholder='420'
                value={tokenId}
            />
            <button disabled={!write || isLoading}>
                {isLoading ? 'Minting...' : 'Mint'}
            </button>
            {isSuccess && (
                <div>
                    SUccessfully minted your NFT!
                </div>
            )}
            {/* {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )} */}
        </form>
    )
}