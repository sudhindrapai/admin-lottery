import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import React from 'react';


interface DatepickerProps {
    label:string,
    name:string,
    value: Date | null | any,
    onChangeDate(date: Date|null|any , name: string):void
}

const DatePickerComponent:React.FC<DatepickerProps> = ({label, name, value, onChangeDate}) => {

  const handleChange = (newValue: any | Date | null) => {
    // const { _d } = newValue;
    onChangeDate(new Date(newValue?._d).toString(), name);
  };
console.log(value,"date picker")
    return<LocalizationProvider dateAdapter={AdapterMoment}>
    <DateTimePicker
          label={label}
          inputFormat="DD/mm/yy h:mm:ss a"
          value={new Date(value)}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} fullWidth={true} />}
        />
  </LocalizationProvider>
};

export default DatePickerComponent