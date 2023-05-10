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

export default function SLTBG({sl, setSl, slPrice, lossDai}) {

  const handleSl = (
    event: React.MouseEvent<HTMLElement>,
    newSl: string,
  ) => {
    setSl(newSl);
  };

  return (
    <Box sx={{ my: 1}}>
        <Grid container spacing={2} alignItems="center" justifyContent={'space-between'}>
            <Grid item>
                <Typography id="input-slider" gutterBottom variant="caption">
                    Stop Loss
                </Typography>
                <Typography id="input-slider2" gutterBottom variant="caption" color='red'>
                    ({slPrice})
                </Typography>
            </Grid>
            <Grid item>
                <Typography id="input-slider2" gutterBottom variant="caption" color='red'>
                    {lossDai}
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
          value={sl}
          exclusive
          onChange={handleSl}
          aria-label="text alignment"
        >
          <ToggleButton value="NONE" aria-label="left aligned">
            NONE
          </ToggleButton>
          <ToggleButton value="-10" aria-label="centered">
            -10%
          </ToggleButton>
          <ToggleButton value="-25" aria-label="right aligned">
            -25%
          </ToggleButton>
          <ToggleButton value="-50" aria-label="justified">
            -50%
          </ToggleButton>
          <ToggleButton value="-75" aria-label="justified">
            -75%
          </ToggleButton>
        </StyledToggleButtonGroup>

        <TextField id="stop_loss_price"
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
