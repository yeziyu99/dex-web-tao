import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';


export default function LimitTBG({limit, setLimit}) {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        limit: string,
    ) => {
        setLimit(limit);
    };

    return (
      <>
        <Box>
            <ToggleButtonGroup
            fullWidth
            color="primary"
            value={limit}
            exclusive
            onChange={handleChange}
            aria-label="Limit"
            >
                <ToggleButton value="market" size="small">Market</ToggleButton>
                <ToggleButton value="limit" size="small">Limit</ToggleButton>
                <ToggleButton value="stop" size="small">Stop</ToggleButton>
            </ToggleButtonGroup>
        </Box>
      </>
    );
  }
  