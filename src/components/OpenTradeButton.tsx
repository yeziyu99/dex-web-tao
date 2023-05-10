import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { tradingABI, useTradingStorageOpenLimitOrderTypes } from '../generated'
import { BigNumber } from 'ethers'
import { utils } from 'ethers'
import { Box, Alert, Button } from '@mui/material'

export function OpenTradeButton({ positionSizeDai, openPrice, buy, leverage, tp, sl, slippage }) {
    console.log(111,positionSizeDai, openPrice, buy, leverage, tp, sl, slippage)
    
    const { address: loginTrader }= useAccount();
    tp = tp === 'None' ? "0" : tp;
    sl = sl === 'None' ? "0" : sl;
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0x422527176F8b33977364A2D5aBb332E2E49f21Ce',
        abi: tradingABI,
        functionName: 'openTrade',
        args: [{
                trader: loginTrader,
                pairIndex: BigNumber.from(0),
                index: BigNumber.from(0),
                initialPosSizeDai: BigNumber.from(0),
                positionSizeDai: utils.parseUnits(positionSizeDai, 18),
                openPrice: utils.parseUnits(openPrice, 10),
                buy: buy === 'long' ? true : false,
                leverage: BigNumber.from(leverage),
                tp: utils.parseUnits(tp, 10),
                sl: utils.parseUnits(sl, 10),
            },
            0,
            utils.parseUnits(slippage, 10)
        ],
    })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
      <>
        <Box>
            <Button fullWidth variant="outlined" size="large" color={buy==='long' ? 'success' : 'error'} disabled={!write || isLoading} onClick={() => write?.()}>
                {isLoading ? 'Opening...' : buy === 'long' ? 'Market Long' : 'Market Short'}
            </Button>
            {isSuccess && (
                <Alert variant="outlined" severity="success" sx={{ my: 1}}>
                    <div> Successfully opened a market trade! </div>
                </Alert>
            )}
           
            {(isPrepareError || isError) && (
                <Alert variant="outlined" severity="error" sx={{ my: 1}}>
                    <div>Error: {(prepareError || error)?.message.match(/reverted: (\w+)\", method/)?.[1]}</div>
                </Alert>
            )}
            
        </Box>
      </>
    )
}