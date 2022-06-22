import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import React from 'react';


interface DatepickerProps {
    label:string,
    name:string,
    value: Date | null,
    onChangeDate(date: Date|null, name: string):void
}

const DatePickerComponent:React.FC<DatepickerProps> = ({label, name, value, onChangeDate}) => {

  const [value1, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Date | null) => {
    onChangeDate(newValue, name);
  };

    return<LocalizationProvider dateAdapter={AdapterMoment}>
    <DateTimePicker
          label={label}
          inputFormat="DD/mm/yy h:mm:ss a"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} fullWidth={true} />}
        />
  </LocalizationProvider>
};

export default DatePickerComponent