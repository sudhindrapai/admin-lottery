import * as errorMessages from './errorMessages';
interface Status {
    status:boolean,
    message:string,
    requestObj:any
}

export const validateCreateOnetimeLottery = (obj:any) => {
    let bSubTickets = obj.bronzeSubTickets;
    let gSubTickets = obj.goldSubTickets;
    let pSubTickets = obj.platinumSubTickets;
    let sSubTickets = obj.silverSubTickets;
    let bTicketPrice = obj.bronzeTicketPrice;
    let gTicketPrice = obj.goldTicketPrice;
    let sTicketPrice = obj.silverTicketPrice;
    let pTicketPrice = obj.platinumTicketPrice;
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

    let bSubTickets = obj.bronzeSubTickets;
    let gSubTickets = obj.goldSubTickets;
    let pSubTickets = obj.platinumSubTickets;
    let sSubTickets = obj.silverSubTickets;
    let bTicketPrice = obj.bronzeTicketPrice;
    let gTicketPrice = obj.goldTicketPrice;
    let sTicketPrice = obj.silverTicketPrice;
    let pTicketPrice = obj.platinumTicketPrice;
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