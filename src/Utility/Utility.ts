import {FormElement, customValidationType, FormElementType} from './InterFacesAndEnum';


const emailRegex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const characterRegex = new RegExp(/^[a-zA-Z. ]*$/);
const numberRegex = new RegExp(/^[0-9]*$/)

export const validateEmail = (email: string):boolean  => {
   return emailRegex.test(email);
}

export const characterValidation = (value: string): string => {
    let updatedString  = value.split("").map((character) => {
        if (characterRegex.test(character)) {
            return character;
        } else {
            return "";
        }
    }).join("");
    return updatedString;
}

export const numberValidation = (value:string):string => {
    let updatedString  = value.split("").map((character) => {
        if (numberRegex.test(character)) {
            return character;
        } else {
            return "";
        }
    }).join("");
    return updatedString;
}

interface mobileNumber{
    value: string,
    errorMessage: string
}

export const mobileNumberValidation = (value:string):mobileNumber => {
    let updatedNumbers = numberValidation(value);
    let message = "";

    if (updatedNumbers.length < 10) {
        message = "Invalid mobile number;"
    }

    return {
        value: updatedNumbers.slice(0,10),
        errorMessage: message
    }
}

interface ValidatedFormObj {
    value: string,
    isValidInput: boolean,
    errorMessage: string,
}

// method to return updated form input value state
export const updateFormInputState = 
(event: React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>, values:FormElement[]):FormElement[] => {
    const {name, value} = event.target;
    let updatedArry:FormElement[] = values.map((formObj:FormElement):FormElement => {
        if (formObj.id === name) {
            let obj = Object.assign(formObj);
            let validatedObj:ValidatedFormObj = validateFormElement(obj.customValidationType, value, obj.isRequired, formObj.isCustomValidationRequred);
               
             obj["value"] = validatedObj.value;
             obj["isTouched"] = true;
             obj["errorMessage"] = validatedObj.errorMessage;
             obj["isValidInput"] = validatedObj.isValidInput;
             return obj;
        } else {
            return formObj;
        }
    });
    return updatedArry
};

export const updateFormSelectState = (selectedValue:string, name:string, formValues:FormElement[]):FormElement[] => {
    let updatedArray = formValues.map((formObj) => {
        if (formObj.id === name) {
        let obj = Object.assign(formObj);
        let validatedObj:ValidatedFormObj = validateFormElement(obj.customValidationType, selectedValue, obj.isRequired, formObj.isCustomValidationRequred);
        obj["value"] = validatedObj.value;
        obj["isTouched"] = true;
        obj["errorMessage"] = validatedObj.errorMessage;
        obj["isValidInput"] = validatedObj.isValidInput;
        return obj;
        } else {
            return formObj;
        }
    });
    return updatedArray
}

export const updateFormTimeState = (date: Date|null, name: string, formValues:FormElement[]):FormElement[] => {
    let updatedArray = formValues.map((formObj) => {
        if (formObj.id === name) {
            let obj = Object.assign(formObj);
            obj["value"] = obj.value;
            obj["isTouched"] = true;
            obj["errorMessage"] = "";
            obj["selectedTime"] = date;
            obj["isValidInput"] = "";
            return obj;
        } else {
            return formObj;
        }
    });
    return updatedArray;
}

export const updateFormDate = (date: Date|null, name: string, formValues:FormElement[]):FormElement[] => {
    let updatedArray = formValues.map((formObj) => {
        if (formObj.id === name) {
            let obj = Object.assign(formObj);
            obj["value"] = date;
            obj["isTouched"] = true;
            obj["errorMessage"] = "";
            obj["slectedDate"] = date;
            obj["isValidInput"] = "";
            return obj;
        } else {
            return formObj;
        }
    });
    return updatedArray;
}

// method will validate the input with empty and custom validation
const validateFormElement = (validationType:customValidationType, value:string, isRequired:boolean, customValidationRequired:boolean):ValidatedFormObj => {
    let updatedValue = value;
    let validatedObj = {
        value: updatedValue,
        isValidInput: false,
        errorMessage: ""
    }
    if (isRequired && updatedValue.length === 0) {
        return {
            value: updatedValue,
            isValidInput: false,
            errorMessage: "value should not be empty",
        }
    }

    if (customValidationRequired && updatedValue.length > 0) {
        switch (validationType) {
            case customValidationType.emailValidation:
                return validatedObj = {
                    value: updatedValue,
                    isValidInput: validateEmail(updatedValue),
                    errorMessage: validateEmail(updatedValue) ? "" : "Invalid email id"
                }
                case customValidationType.characterValidation:
                    return validatedObj = {
                        value: characterValidation(updatedValue),
                        isValidInput: true,
                        errorMessage: ""
                    }
                    case customValidationType.mobileValidation:
                        let mobileValidateObj = mobileNumberValidation(updatedValue);
                        console.log(mobileValidateObj,"mobile")
                        return{
                            value: mobileValidateObj.value,
                            isValidInput: mobileValidateObj.errorMessage.length > 0,
                            errorMessage: mobileValidateObj.errorMessage
                        }
                default: return validatedObj;
        }
    }

    return validatedObj

}

// method to validate complete form
export const validateForm = (formElements:FormElement[]):boolean => {
    let isValidForm = true;
    for (let element of formElements) {
        if (element.isRequired || element.isCustomValidationRequred && element.errorMessage.length > 0) {
            isValidForm = false;
            break;
        }
    }
    return isValidForm
} 

// method to add padding zero to the incoming digit 
// incoming value 8 it will return 08
export const addPaddingZero = (digit: number):string => digit > 9 ? `${digit}` : `0${digit}`;


export const monthNames = (monthNumber:number): string => {
    switch (monthNumber) {
        case 0 :
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "NA";

    }
}

export const transformDate = (dateObj:Date): string => {
    let date = new Date(dateObj);
    return `${date.getDate()} ${monthNames(date.getMonth())} ${date.getFullYear()}`
};