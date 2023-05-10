import * as React from 'react'
import { useDebounce } from 'use-debounce'
import { 
    useSendTransaction,
    useWaitForTransaction,
} from 'wagmi'
import {usePrepareSendTransaction} from 'wagmi';
import { utils } from 'ethers'

export function SendTransaction() {
    const [to, setTo] = React.useState('');
    const [debounceTo] = useDebounce(to, 500);

    const [amount, setAmount] = React.useState('');
    const [debounceAmount] = useDebounce(amount, 500);

    const { config } = usePrepareSendTransaction({
        request: {
            to: debounceTo,
            value: debounceAmount ? utils.parseEther(debounceAmount) : undefined,
        },
    });
    const { data, sendTransaction } = useSendTransaction(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    })

    return (
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            sendTransaction?.()
            }}
        >
            <input aria-label="Recipient" onChange={(e) => setTo(e.target.value)} placeholder="0xA0Cf…251e" value={to} />
            <input aria-label="Amount (ether)" onChange={(e) => setAmount(e.target.value)} placeholder="0.05" value={amount} />
            <button disabled={!sendTransaction || !to || !amount}>
                {isLoading ? 'Sending...' : 'Send'}
            </button>

            {isSuccess && (
                <div>
                    Successfully sent {amount} ether to {to}
                </div>
            )}
        </form>
    )
}