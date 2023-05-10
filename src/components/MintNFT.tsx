import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

export function MintNFT() {
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0x42dD9CC51674411fE3d9A7620F1a25696C6A59e2',
        abi: [
            {
                "inputs": [],
                "name": "done",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        functionName: 'done'
    })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <button disabled={!write || isLoading} onClick={() => write?.()}>
                {isLoading ? 'Minting...' : 'Mint'}
            </button>
            {isSuccess && (
                <div>
                    Successfully minted your NFT!
                </div>
            )}
            {/* {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )} */}
        </div>
    )
}