import {validateEmail} from './Utility'
import * as errorMessages from './errorMessages';
interface Status {
    status:boolean,
    message:string,
    requestObj:any
}

const checkForNaN = (value:any) => {
    let updatedValue = value;

    if (value === undefined || value === null || isNaN(value)) {
        updatedValue = "";
    }

    return updatedValue
}

export const validateCreateOnetimeLottery = (obj:any) => {
    let bSubTickets = checkForNaN(obj.bronzeSubTickets);
    let gSubTickets = checkForNaN(obj.goldSubTickets);
    let pSubTickets = checkForNaN(obj.platinumSubTickets);
    let sSubTickets = checkForNaN(obj.silverSubTickets);
    let bTicketPrice = checkForNaN(obj.bronzeTicketPrice);
    let gTicketPrice = checkForNaN(obj.goldTicketPrice);
    let sTicketPrice = checkForNaN(obj.silverTicketPrice);
    let pTicketPrice = checkForNaN(obj.platinumTicketPrice);
    let lotteryType = obj.rewardType;
    let giftName = obj.rewardGiftName;
    let giftImgs = obj.rewardImages;
    let rewardAmount = obj.rewardAmount;
    let lotteryVisibility = obj.lotterySettingVisibility;
    let endDate = obj.lotteryEndDate;
    let startDate = obj.lotteryStartDate;

    let statusObj:Status = {
        status: true,
        message:"",
        requestObj:obj
    }

    if (statusObj.status && lotteryVisibility.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyVisibility;
    }

    if (statusObj.status && bSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeSubTickets;
    }

    if (statusObj.status && gSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldSubTickets;
    }

    if (statusObj.status && pSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumSubTickets;
    } 

    if (statusObj.status && sSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilveerSubTickets;
    }

    if (statusObj.status && bTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeTicketPrice;
    }

    if (statusObj.status && gTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldTicketPrice;
    }

    if (statusObj.status && sTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilverTicketPrice;
    }

    if (statusObj.status && pTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumTicketPrice;
    }

    if (lotteryType === "G") {
        if (statusObj.status && giftName.length === 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyGiftName;
        }
        if (statusObj.status && giftImgs === null || giftImgs.length === 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyRewardImgs;
        }
    } else if (statusObj.status && lotteryType === "M") {
        if ( rewardAmount === null || rewardAmount.length === 0 || parseInt(rewardAmount) <= 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyRewardAmount;
        }
    }

    if (statusObj.status && startDate.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyStartDate;
    }

    if (statusObj.status && endDate.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyEndDate;
    }

    return statusObj
}

export const validateCreateRepeatLottery = (obj:any) => {

    let bSubTickets = checkForNaN(obj.bronzeSubTickets);
    let gSubTickets = checkForNaN(obj.goldSubTickets);
    let pSubTickets = checkForNaN(obj.platinumSubTickets);
    let sSubTickets = checkForNaN(obj.silverSubTickets);
    let bTicketPrice = checkForNaN(obj.bronzeTicketPrice);
    let gTicketPrice = checkForNaN(obj.goldTicketPrice);
    let sTicketPrice = checkForNaN(obj.silverTicketPrice);
    let pTicketPrice = checkForNaN(obj.platinumTicketPrice);
    let lotteryType = obj.rewardType;
    let giftName = obj.rewardGiftName;
    let giftImgs = obj.rewardImages;
    let rewardAmount = obj.rewardAmount;
    let lotteryVisibility = obj.lotterySettingVisibility;
    let endTime = obj.lotteryEndTime;
    let startTime = obj.lotteryStartTime;

    let statusObj:Status = {
        status: true,
        message:"",
        requestObj:obj
    }

    if (statusObj.status && lotteryVisibility.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyVisibility;
    }

    if (statusObj.status && bSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeSubTickets;
    }

    if (statusObj.status && gSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldSubTickets;
    }

    if (statusObj.status && pSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumSubTickets;
    } 

    if (statusObj.status && sSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilveerSubTickets;
    }

    if (statusObj.status && bTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeTicketPrice;
    }

    if (statusObj.status && gTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldTicketPrice;
    }

    if (statusObj.status && sTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilverTicketPrice;
    }

    if (statusObj.status && pTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumTicketPrice;
    }

    if (lotteryType === "G") {
        if (statusObj.status && giftName.length === 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyGiftName;
        }
        if (statusObj.status && giftImgs === null || giftImgs.length === 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyRewardImgs;
        }
    } else if (statusObj.status && lotteryType === "M") {
        if (rewardAmount === null || rewardAmount.length === 0 || parseInt(rewardAmount) <= 0) {
            statusObj["status"] = false;
            statusObj["message"] = errorMessages.emptyRewardAmount;
        }
    }

    if (statusObj.status && startTime.length === 0) {
            statusObj["status"] = false;
            statusObj["message"] = "start time should not be empty";
    }

    if (statusObj.status && endTime.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "end time should not be empty";
    }

    return statusObj
}

export const validateCreateAuction = (obj:any) => {

    console.log(obj)
    let bSubTickets = obj.bronzeSubTickets;
    let gSubTickets = obj.goldSubTickets;
    let pSubTickets = obj.platinumSubTickets;
    let sSubTickets = obj.silverSubTickets;
    let bTicketPrice = obj.bronzeTicketPrice;
    let gTicketPrice = obj.goldTicketPrice;
    let sTicketPrice = obj.silverTicketPrice;
    let pTicketPrice = obj.platinumTicketPrice;
    let title = obj.auctionTitle;
    let proposedPrice = obj.auctionProposedPrice;
    let address = obj.address;
    let state = obj.state;
    let city = obj.city;
    let country = obj.country;
    let pincode = obj.pincode;
    let emailId = obj.userEmailId;
    let mobileNo = obj.userMobile;
    let name = obj.userName;
    let category = obj.productCategory;
    let type = obj.productType;
    let startDate = obj.auctionStartDate;
    let endDate = obj.auctionEndDate;

    let statusObj:Status = {
        status:true,
        message:"",
        requestObj:obj
    }

    if (statusObj.status && bSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeSubTickets;
    }

    if (statusObj.status && gSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldSubTickets;
    }

    if (statusObj.status && pSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumSubTickets;
    } 

    if (statusObj.status && sSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilveerSubTickets;
    }

    if (statusObj.status && bTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyBronzeTicketPrice;
    }

    if (statusObj.status && gTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyGoldTicketPrice;
    }

    if (statusObj.status && sTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptySilverTicketPrice;
    }

    if (statusObj.status && pTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = errorMessages.emptyPlatinumTicketPrice;
    }

    if (statusObj.status && title.length === 0) {
        statusObj["message"] = "auction title should not be empty";
        statusObj["status"] = false;
    }

    if (statusObj.status && proposedPrice.length === 0 ) {
        statusObj["message"] = "propsed price should not be empty";
        statusObj["status"] = false;
    } else if (statusObj.status && proposedPrice.length > 0 && parseInt(proposedPrice) <= 0) {
        statusObj["message"] = "invalid proposed price";
        statusObj["status"] = false;
    }

    if (statusObj.status && address.length === 0) {
        statusObj["message"] = "address should not be empty";
        statusObj["status"] = false;
    }

    if (statusObj.status && state.length === 0) {
        statusObj["message"] = "state should not be empty";
        statusObj["status"] = false;
    }

    if (statusObj.status && city.length === 0) {
        statusObj["message"] = "city should not be empty";
        statusObj["status"] = false;
    }

    if (statusObj.status && country.length === 0) {
        statusObj["message"] = "country should not be empty";
        statusObj["status"] = false;
    }

    if (statusObj.status && pincode.length === 0) {
        statusObj["message"] = "pincode should not be empty";
        statusObj["status"] = false;
    } 
    if (statusObj.status && pincode.length <= 6) {
        statusObj["message"] = "invalid pincode";
        statusObj["status"] = false;
    }

    if (statusObj.status && emailId.length === 0) {
        statusObj["message"] = "email id should not be empty";
        statusObj["status"] = false;
    } 
    if (statusObj.status && emailId.length > 0) {
        let isValidEmail = validateEmail(emailId);
        if (isValidEmail === false) {
            statusObj["status"] = false;
            statusObj["message"] = "invalid email id";
        }
    }

    if (statusObj.status && mobileNo.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "mobile number should not be empty";
    } 
    if (statusObj.status && mobileNo.length > 0 && mobileNo.length < 10) {
        statusObj["status"] = false;
        statusObj["message"] = "Invalid mobile number";
    } 

    if (statusObj.status && name.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "name should not be empty";
    }

    if (statusObj.status && category.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "product category should not be empty";
    }

    if (statusObj.status && type.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "product type should not be empty";
    }

    if (statusObj.status && startDate.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "start date should not be empty";
    }

    if (statusObj.status && endDate.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "end date should not be empty";
    }


    return statusObj;
}

export const validateCreateNotification = (obj:any) => {

    console.log(obj,"[validateCreateNotification]")


    let scheduleDate = obj.emailScheduleDate;
    let subject = obj.emailSubject;
    let body = obj.emailBody;
    let attachments = obj.emailAttachments;

    let statusObj:Status = {
        status: true,
        message:"",
        requestObj:obj
    }

    if (statusObj.status && scheduleDate.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "schedule date should not be empty";
    }

    if (statusObj.status && subject.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "email subject should not be empty";
    }

    if (statusObj.status && body.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "email body should not be empty";
    }

    if (statusObj.status && attachments.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = "email attachment should not be empty";
    }

    return statusObj
}

export const validateSettingsTicketsDetail = (obj:any,isFromLottery:boolean) => {

    let bSubTickets = checkForNaN(obj.bronzeSubTickets);
    let gSubTickets = checkForNaN(obj.goldSubTickets);
    let pSubTickets = checkForNaN(obj.platinumSubTickets);
    let sSubTickets = checkForNaN(obj.silverSubTickets);
    let bTicketPrice = checkForNaN(obj.bronzeTicketPrice);
    let gTicketPrice = checkForNaN(obj.goldTicketPrice);
    let sTicketPrice = checkForNaN(obj.silverTicketPrice);
    let pTicketPrice = checkForNaN(obj.platinumTicketPrice);

    let statusObj:Status = {
        status: true,
        message:"",
        requestObj:obj
    }

    let prefix = isFromLottery ? "lottery":"auction";


    const updateMessage = (message) => {
        return `${prefix} ${message}`;
    };

    if (statusObj.status && bSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyBronzeSubTickets);
    }

    if (statusObj.status && gSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyGoldSubTickets);
    }

    if (statusObj.status && pSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyPlatinumSubTickets);
    } 

    if (statusObj.status && sSubTickets.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptySilveerSubTickets);
    }

    if (statusObj.status && bTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyBronzeTicketPrice);
    }

    if (statusObj.status && gTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyGoldTicketPrice);
    }

    if (statusObj.status && sTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptySilverTicketPrice);
    }

    if (statusObj.status && pTicketPrice.length === 0) {
        statusObj["status"] = false;
        statusObj["message"] = updateMessage(errorMessages.emptyPlatinumTicketPrice);
    }


    return statusObj
}