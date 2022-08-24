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
    onChangeDate(new Date(newValue?._d).toString(), name);
  };

  // const updatedValue = new Date(value.getTime() - value.getTimezoneOffset()*60*1000);
    return<LocalizationProvider dateAdapter={AdapterMoment}>
    <DateTimePicker
          label={label}
          inputFormat="DD/MM/yy h:mm:ss a"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} fullWidth={true} />}
        />
  </LocalizationProvider>
};

export default DatePickerComponent