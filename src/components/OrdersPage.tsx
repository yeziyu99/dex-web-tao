import * as React from 'react';
import { getContract } from 'wagmi/dist/actions'
import { tradingABI, useTradingCloseTradeMarket, useTradingIsDone, useTradingMaxPosDai, useTradingOpenTrade, useTradingStorageOpenTrades, useTradingStorageOpenTradesCount } from '../generated'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { BigNumber } from 'ethers';
import { utils } from 'ethers';
import { Close } from '@mui/icons-material'
import { useDebounce } from 'use-debounce';

export default function OrdersPage() {
    const { address: loginTrader }= useAccount();
    const pairIndex = BigNumber.from(0);

    const [closeIndex, setCloseIndex] = React.useState(0);

    const { data: openTradesCount } = useTradingStorageOpenTradesCount({
        address: '0x23DADb9D745703fb8085d431883a7D3A2b55D274',
        args: [loginTrader, pairIndex]
    })

    const rows = [];
    for (let i = 0; i < openTradesCount?.toNumber(); i++) {
        let index = BigNumber.from(i);
        const { data: openTrade } = useTradingStorageOpenTrades({
            address: '0x23DADb9D745703fb8085d431883a7D3A2b55D274',
            args: ['0xa9efe554333169Fa23E6B1f660dA00Ff72fC56C1', pairIndex, index]
        })

        if (Number(openTrade?.leverage) !== 0) {
            rows.push(openTrade);
        }
    }

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0x422527176F8b33977364A2D5aBb332E2E49f21Ce',
        abi: tradingABI,
        functionName: 'closeTradeMarket',
        args: [pairIndex, BigNumber.from(closeIndex)],
    })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <>
        <Container maxWidth="xl">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Pair</TableCell>
                        <TableCell align="right">Leverage</TableCell>
                        <TableCell align="right">Collateral</TableCell>
                        <TableCell align="right">Open price</TableCell>
                        <TableCell align="right">Liq/SL</TableCell>
                        <TableCell align="right">Take profit</TableCell>
                        <TableCell align="right">Close</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row?.index.toNumber()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row?.index.toNumber()}</TableCell>
                            <TableCell component="th" scope="row">{row?.buy ? 'Long' : 'Short'}</TableCell>
                            <TableCell align="right">{row?.pairIndex.toNumber()}</TableCell>
                            <TableCell align="right">{row?.leverage.toNumber()}</TableCell>
                            <TableCell align="right">{utils.formatUnits(row?.positionSizeDai)}</TableCell>
                            <TableCell align="right">{utils.formatUnits(row?.openPrice, 10)}</TableCell>
                            <TableCell align="right">{utils.formatUnits(row?.sl, 10)}</TableCell>
                            <TableCell align="right">{utils.formatUnits(row?.tp, 10)}</TableCell>
                            <TableCell align="right" onPointerEnter={() =>setCloseIndex(row?.index.toNumber())}>
                                <Close disabled={!write || isLoading} onClick={() => write?.()}/>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
}