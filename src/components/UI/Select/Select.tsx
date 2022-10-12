import {FC, Fragment} from 'react';
// import InputLabel from '@mui/material/InputLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { MenuItem } from '@mui/material';

interface SelectProps {
    fullWidth: boolean,
    required: boolean,
    value: string,
    label:string,
    id: string,
    name: string,
    error: boolean,
    dropdownValues:string[],
    disabled:boolean,
    handleInputChange(value: string, id: string):void
}

const SelectInput:FC<SelectProps> = (props) => {
    const {fullWidth,required,value,label,id,name,error,dropdownValues,disabled,handleInputChange} = props

    const handleChange = (event: SelectChangeEvent) => {
        handleInputChange(event.target.value as string, id)
    }
    return <Fragment>
        <FormControl fullWidth={fullWidth}  >
        <InputLabel required={required} id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value as string}
          label={label}
          name={name}
          error={error}
          disabled={disabled}
          onChange={handleChange}
        >
          {dropdownValues.map((dropdownValue) => {
              return <MenuItem value={dropdownValue} >{dropdownValue}</MenuItem>
          })}
        </Select>
        </FormControl>
    </Fragment>
};

export default SelectInput