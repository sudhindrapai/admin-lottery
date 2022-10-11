import {ChangeEvent, FC} from 'react';

import DatePicket from '../../components/UI/DatePicker/DatePicker';
import Input from '../../components/UI/Input/Input';
import { InputTypes, InputVariant } from '../../Utility/InterFacesAndEnum';

import {InputElementWrapper} from './StyledTemp'

interface StaticFormProps {
    startDate: Date,
    endDate: Date,
    url:string,
    onDateChange(date:any,name:string):void,
    onUrlChange(redirectionUrl:string):void
}

const StaticForm:FC<StaticFormProps> = (props) => {
    
    const {startDate, endDate, url,onDateChange,onUrlChange} = props;

    const hangelInputChange = (event:React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>) => {
        onUrlChange(event.target.value)
    }

    return <>
        <InputElementWrapper>
        <Input type={InputTypes.email} variant={InputVariant.outlined} 
        label={"Redirection URL"} value={url} name={'redirectionUrl'} 
        fullWidth={true} helperText={''} error={false} required={false} 
        disabled={false}
        handleInputChange={hangelInputChange} />
        </InputElementWrapper>
        <InputElementWrapper>
        <DatePicket label={"Start Date"} name={'startDate'} value={new Date(startDate)} onChangeDate={onDateChange} />
        </InputElementWrapper>
        <InputElementWrapper>
        <DatePicket label={"End Date"} name={'endDate'} value={endDate} onChangeDate={onDateChange} />
        </InputElementWrapper>
    </>
};

export default StaticForm