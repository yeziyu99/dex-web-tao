import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Grid, Typography } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function TPTBG({tp, setTp, tpPrice, profitDai}) {
  const handleTp = (
    event: React.MouseEvent<HTMLElement>,
    newTp: string,
  ) => {
    setTp(newTp);
  };

  return (
    <Box sx={{ my: 1}}>
        <Grid container spacing={2} alignItems="center" justifyContent={'space-between'}>
            <Grid item>
                <Typography id="input-slider" gutterBottom variant="caption">
                    Take Profit
                </Typography>
                <Typography id="input-slider2" gutterBottom variant="caption" color='green'>
                    ({tpPrice})
                </Typography>
            </Grid>
            <Grid item>
                <Typography id="input-slider2" gutterBottom variant="caption" color='green'>
                    {profitDai}
                </Typography>
            </Grid>
        </Grid>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={tp}
          exclusive
          onChange={handleTp}
          aria-label="text alignment"
        >
          <ToggleButton value="25" aria-label="left aligned">
            25%
          </ToggleButton>
          <ToggleButton value="50" aria-label="centered">
            50%
          </ToggleButton>
          <ToggleButton value="100" aria-label="right aligned">
            100%
          </ToggleButton>
          <ToggleButton value="300" aria-label="justified">
            300%
          </ToggleButton>
          <ToggleButton value="900" aria-label="justified">
            900%
          </ToggleButton>
        </StyledToggleButtonGroup>

        <TextField id="take_profit_price"
            placeholder='PRICE'
            variant="outlined"
            value=""
            type="string"
            size="small"
            sx={{ width:80, padding: 0.5 }} />
      </Paper>
    </Box>
  );
}
