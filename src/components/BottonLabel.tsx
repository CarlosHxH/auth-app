'use client'
import React, { useState } from 'react';
import { ToggleButtonGroup, Box, Typography, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';

type OnChangeEvent = {
  [key: string]: any; 
};

interface Props {
  title: string
  name: string;
  values: string[];
  onChange?: (event: OnChangeEvent) => void;
}

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#0070f3'
  },
  '&.Mui-selected': {
    backgroundColor: "#0070f3",
    color: 'white',
    '&:hover': {
      backgroundColor: '#0070f3',
      color: "#fff",
    }
  },
}));

const BottonLabel: React.FC<Props> = (props) =>
{
  const [pos, setPos] = useState<string | null>('');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>|React.ChangeEvent, value: string | null) =>
  {
    if (value !== null) setPos(value)
    if(props.onChange) {
      props.onChange({[props.name]:value});
    }
  };

  const item = (val: any) => <StyledToggleButton key={val} value={val} aria-label={val}>{val}</StyledToggleButton>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
      <Typography variant='h5' color='textSecondary' sx={{ mt: 'auto', mr: 2, alignItems: 'center' }}>{props.title}</Typography>
      <ToggleButtonGroup value={pos} exclusive onChange={handleAlignment} aria-label="Toggle">
        {props.values.map(item)}
      </ToggleButtonGroup>
    </Box>
  );
};
export default BottonLabel;