import * as React from 'react';
import { getContract } from 'wagmi/dist/actions'
import { tradingABI, useTradingIsDone, useTradingMaxPosDai, useTradingOpenTrade } from '../generated'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import { CurrencyBitcoinSharp } from '@mui/icons-material'
import LeverageSlider from '../components/LeverageSlider'
import LongTBG from './LongTBG';
import LimitTBG from './LimitTBG';
import SLTBG from './SLTBG';
import TPTBG from './TPTBG';
import { OpenTradeButton } from './OpenTradeButton';


export default function TradingPage() {
    const [positionSizeDai, setPositionSizeDai]= React.useState("100");
    const [openPrice, setOpenPrice] = React.useState("1900");
    const [buy, setBuy] = React.useState("long");
    const [leverage, setLeverage] = React.useState<number | Array<number>>(30);
    const [slippage, setSlippage] = React.useState("1.01");
    const [limit, setLimit] = React.useState("market");
    const [sl, setSl] = React.useState('NONE');
    const [slPrice, setSlPrice] = React.useState('None');
    const [lossDai, setLossDai] = React.useState('None');
    const [tp, setTp] = React.useState('900');
    const [tpPrice, setTpPrice] = React.useState('None');
    const [profitDai, setProfitDai] = React.useState('None');

    React.useEffect(() => {
        handleSlPrice();
    }, [buy, openPrice, positionSizeDai, leverage, sl]);

    React.useEffect(() => {
        handleTpPrice();
    }, [buy, openPrice, positionSizeDai, leverage, tp]);

    function handleSlPrice() {
        let newSlPrice;
        let newLossDai;

        if (sl !== 'NONE') {  // TODO: Use estimate execution price instead openPrice
            newLossDai = Number(sl) / 100 * Number(positionSizeDai);
            if (buy === 'long') {
                newSlPrice = Number(openPrice) * (1 + Number(newLossDai) / (Number.parseInt(positionSizeDai) * leverage)); 
            } else {
                newSlPrice = Number(openPrice) * (1 - Number(newLossDai) / (Number.parseInt(positionSizeDai) * leverage));
            }
            newLossDai = newLossDai.toFixed(1);
            newSlPrice = newSlPrice.toFixed(2);
        } else {
            newSlPrice = 'None';
            newLossDai = 'None';
        }

        setSlPrice(newSlPrice);
        setLossDai(newLossDai === 'None' ? 'None': newLossDai + ' Dai');
    };

    const handleTpPrice = () => {
        let newTpPrice;
        let newProfitDai;

        newProfitDai = Number(tp) / 100 * Number(positionSizeDai);
        if (buy === 'long') {
            newTpPrice = Number(openPrice) * (1 + Number(newProfitDai) / (Number.parseInt(positionSizeDai) * leverage));
        } else {
            newTpPrice = Number(openPrice) * (1 - Number(newProfitDai) / (Number.parseInt(positionSizeDai) * leverage));
        }
        newProfitDai = newProfitDai.toFixed(1);
        newTpPrice = newTpPrice.toFixed(2);

        setTpPrice(newTpPrice);
        setProfitDai('+' + newProfitDai + ' Dai');
    };

    return (
      <>
        <Container maxWidth="xs">
          <Box>
            <LongTBG buy={buy} setBuy={setBuy} /><br />
            <LimitTBG limit={limit} setLimit={setLimit} />
  
            <FormControl fullWidth variant="standard" sx={{ my: 1, display: 'inline-flex' }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Collateral(50-125k)
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={positionSizeDai}
                onChange={(e) => setPositionSizeDai(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <CurrencyBitcoinSharp />DAI
                  </InputAdornment>
                }
              />
              </FormControl>
  
              <LeverageSlider value={leverage} setValue={setLeverage} />
  
              <Box sx={{ my: 1, display: 'inline-flex' }} justifyContent={'space-between'}>
                <TextField
                  id="price_input"
                  variant="standard"
                  label="Price"
                  value={openPrice}
                  onChange={(e) => setOpenPrice(e.target.value)}
                  type="string"
                  InputLabelProps={{ shrink: true, }}
                />&nbsp;
                <TextField
                  id="slippage_input"
                  variant="standard"
                  label="Slippage(%)"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  type="string"
                  InputLabelProps={{ shrink: true, }}
                />
              </Box>
              <SLTBG sl={sl} setSl={setSl} slPrice={slPrice} lossDai={lossDai} />
              <TPTBG tp={tp} setTp={setTp} tpPrice={tpPrice} profitDai={profitDai} />
              <OpenTradeButton positionSizeDai={positionSizeDai} openPrice={openPrice} buy={buy} leverage={leverage} sl={slPrice} tp={tpPrice} slippage={slippage}/>
          </Box>
        </Container>
      </>
    );
  }
  