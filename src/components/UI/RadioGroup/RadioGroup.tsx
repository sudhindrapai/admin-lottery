import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

interface RadioItem {
    value: string,
    title: string
}

interface RadioGroupProps{
    label: string,
    row: boolean,
    name: string,
    value: string,
    handleInputChange(event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void,
    radioItems: RadioItem[]
}

const RadioInput:React.FC<RadioGroupProps> = ({label, row, name, value, handleInputChange, radioItems}) => {
    return <FormControl>
    <FormLabel>
       {label}
    </FormLabel>
    <RadioGroup row={true} name={name} value={value} onChange={handleInputChange} >
        {radioItems.map((radioItem: RadioItem, index:number):JSX.Element => {
            return <FormControlLabel key={`${radioItem.value}_${index}`} value={radioItem.value} control={<Radio />} label={radioItem.title} />
        })}
    </RadioGroup>
</FormControl>
};

export default RadioInput