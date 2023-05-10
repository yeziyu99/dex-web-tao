import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';


export default function LongTBG({buy, setBuy}) {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        buy: string,
    ) => {
        setBuy(buy);
    };

    return (
      <>
        <Box>
            <ToggleButtonGroup
            fullWidth
            color="primary"
            value={buy}
            exclusive
            onChange={handleChange}
            aria-label="Buy"
            >
            <ToggleButton value="long" color='success'>Long</ToggleButton>
            <ToggleButton value="short" color='error'>Short</ToggleButton>
            </ToggleButtonGroup>
        </Box>
      </>
    );
  }
  