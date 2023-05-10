import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 60px;
`;

export default function LeverageSlider({value, setValue}) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    // if (value < 0) {
    //   setValue(0);
    // } else if (value > 100) {
    //   setValue(100);
    // }
  };

  const marks = [
    {
      value: 2,
      label: '2',
    },
    {
      value: 25,
      label: '20',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 125,
      label: '125',
    },
    {
      value: 150,
      label: '150',
    },
  ];

  return (
    <Box sx={{ my: 1}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography id="input-slider" gutterBottom variant="caption">
          Leverage(2x-150x)
          </Typography>
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 2,
              max: 150,
              type: 'number',
              'aria-labelledby': 'input-slider',
              style: { textAlign: 'center' },
            }}
          />
        </Grid>
      </Grid>
      <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            marks={marks}
            step={1}
            valueLabelDisplay="auto"
          /> 
    </Box>
  );
}
