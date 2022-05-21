import React, {FC} from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface TimePickerProps {
  label: string,
  fullWidth: boolean,
  name: string,
  value: Date | null,
  error: boolean,
  onTimeChange(date: Date|null, name: string):void
}

const TimePickerComponent:FC<TimePickerProps> = (props) => {

  const {label, fullWidth, value, error, name, onTimeChange} = props;

    
      const handleChange = (newValue: Date | null) => {
        onTimeChange(newValue, name);
      };
    

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          label={label}
          value={value}
          onChange={handleChange}
          renderInput={(params:any) => <TextField error={error} {...params} fullWidth={fullWidth} />}
        />
    </LocalizationProvider>
};
export default TimePickerComponent