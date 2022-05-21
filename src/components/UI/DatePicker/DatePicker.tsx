import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React from 'react';


interface DatepickerProps {
    label:string,
    name:string,
    value: Date | undefined,
    onChangeDate(date: Date|null, name: string):void| undefined
}

const DatePickerComponent:React.FC<DatepickerProps> = ({label, name, value, onChangeDate}) => {

  const [value1, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Date | null) => {
    onChangeDate(newValue, name);
  };

    return<LocalizationProvider dateAdapter={AdapterMoment}>
    <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value1}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} fullWidth={true} />}
        />
  </LocalizationProvider>
};

export default DatePickerComponent