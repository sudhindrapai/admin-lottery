import React, {useState} from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, OutlinedInput, InputAdornment, InputLabel, FormHelperText } from '@mui/material';
import {InputVariant} from '../../../Utility/InterFacesAndEnum';

interface PasswordVisibilityState {
    showPassword: boolean
}

interface PasswordProps {
  label: string,
  fullWidth: boolean,
  variant: InputVariant,
  id: string,
  value: string,
  required:boolean,
  error:boolean,
  errorMessage: string,
  onPasswordChange(event: React.ChangeEvent<HTMLInputElement>):void
}

const PasswordIput:React.FC<PasswordProps> = ({fullWidth, variant, id, value, label, required,error,errorMessage, onPasswordChange}) => {

    const [values, setValue] = useState<PasswordVisibilityState>({showPassword:false});

    const handleClickShowPassword = ():void => {
        setValue({
          ...values,
          showPassword: !values.showPassword,
        });
      };

      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    return <FormControl error={error} required={required} fullWidth={fullWidth} variant={variant}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      error={error}
      required={required}
      type={values.showPassword ? 'text' : 'password'}
      value={value}
      name={id}
      onChange={onPasswordChange}
      label={label}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
    <FormHelperText error={error} id={id}>{errorMessage}</FormHelperText>
  </FormControl>
}

export default PasswordIput