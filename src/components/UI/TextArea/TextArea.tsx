import React from 'react';
import {TextField} from '@mui/material';

import {InputVariant} from '../../../Utility/InterFacesAndEnum';

interface InputProps {
    variant: InputVariant
    label: string,
    value: string,
    name: string,
    fullWidth: boolean,
    helperText: string,
    error: boolean,
    required: boolean,
    row:number
    disabled:boolean,
    handleInputChange(event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>):void
}

const TextAreaComponent: React.FC<InputProps> = ({required,variant,label,value,name,error,helperText, row, fullWidth,disabled,handleInputChange}) => {
    return <TextField required={required}
    type={"text"} 
    rows={row}
    multiline
    variant = {variant} 
    label={label} 
    value={value} 
    name={name}
    error={error}
    helperText ={helperText}
    fullWidth={fullWidth} 
    disabled={disabled}
    onChange={handleInputChange} />
};

export default TextAreaComponent