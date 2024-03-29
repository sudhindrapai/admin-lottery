import * as localStorageActionType from '../LocalStorage/ActionTypes';
import {setLocalStorage} from '../LocalStorage/SetLocalStorage';
import {adminRouts} from '../routs'
import {FormElement, customValidationType} from './InterFacesAndEnum';
import moment from 'moment'

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
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
export const validateForm = (formElements:FormElement[]) => {
    let isValidForm = true;
    for (let element of formElements) {
        if (element.isRequired || element.isCustomValidationRequred && element.errorMessage.length > 0) {
            isValidForm = false;
            break;
        }
    }
    return isValidForm
} 

// export const validateCompleteForm = (formElements: ) => {}

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
    return `${date.getDate()} ${monthNames(date.getMonth())} ${date.getFullYear()} 
    at ${date.getHours() >12 ? addPaddingZero(date.getHours() - 12) : addPaddingZero(date.getHours())}:${addPaddingZero(date.getMinutes())} 
    ${date.getHours() >= 12 ? "PM" : "AM"}`
};

export const sortTableValues = (response:any, objeckKey:string, isSortAsc:boolean) => {
    let arrayForSort  = [...response]
    let sortedResponse = arrayForSort.sort((obj1:any, obj2:any) => {
        if (isSortAsc) {
            return obj1[objeckKey] - obj2[objeckKey];
        } else {
            return obj2[objeckKey] - obj1[objeckKey];
        }
    });

    return sortedResponse;
};

// method to create pagination
export const tablePagination = (response: any, pageNumber:number) => {
    let startPageNumber = (pageNumber * 10) - 10;
    let endPageNumber = pageNumber * 10;

    let totalPageNumbers = Math.ceil((response.length)/10);

    let responseObj = {
        isValidResponse: false,
        pageNumber: pageNumber,
        data:[]
    }

    if (totalPageNumbers >= pageNumber) {
        responseObj["pageNumber"] = pageNumber;
        responseObj["isValidResponse"] = true;
        responseObj["data"] = response.slice(startPageNumber,endPageNumber);
    }

    return responseObj;
}

export const searchTableData = (response: any, searchKey:string) => {
    if (response.length > 0) {
        let filteredResponse:any = [];
        for (let rowObj of response) {
            let values = Object.values(rowObj).join(" ")
            var re = new RegExp(searchKey, 'gi');
            if (values.match(re) !== null) {
                filteredResponse.push(rowObj)
            }
        }
        return filteredResponse;
    }
}


export const transformGMTToUTC = (dateString:string) => {
    // format("YYYY-MM-DDTHH:mm:ss")
    let modifiedDate:any = moment.utc(dateString).format("YYYY-MM-DDTHH:mm:ss").valueOf()
    //  modifiedDate = new Date(modifiedDate).toString();
     return modifiedDate;
}

export const convertCamelCaseToReadableWord = (label:string) => {
    let updatedString = "";
    if (label !== undefined && label !== null && label.length > 0) {
        for (let i = 0; i<label.length; i++) {
            let character = label.charAt(i);
            if (character === character.toUpperCase()) {
                updatedString += " " + character;
            } else {
                updatedString +=character
            }
        }
    }
    return updatedString
}

export const handle401Status = () => {
    setLocalStorage(localStorageActionType.CLEAR_LOGIN_USER_DETAIL,"");
    window.location.href = adminRouts.login;
}