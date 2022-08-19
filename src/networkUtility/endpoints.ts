// const baseUrl = "https://41539805-3c3c-4956-a915-281ef555f98c.mock.pstmn.io";
const baseUrl ="http://192.169.179.206:9092"

export const login = `${baseUrl}/kingsrings/auth/login`; /** Method: POST */
export const getLotteryList = `${baseUrl}/kingsrings/api/v1/lotterygame/adminlist`; /** ?lotteryType=A */
export const createLottery = `${baseUrl}/kingsrings/api/v1/lottery/create`;
export const getTemplateList = `${baseUrl}/kingsrings/api/v1/lottery/list`; /** ?lotteryType=A */
export const getSingleTemplateDetail = `${baseUrl}/kingsrings/api/v1/lottery/list/`; /** {{lotteryId}} */
export const getApprovedAuctionList = `${baseUrl}/kingsrings/api/v1/auction/adminlist`; /** ?auctionStatus=U */
export const getAuctionRequestList = `${baseUrl}/kingsrings/api/v1/auction/adminapprovallist`;/** ?auctionStatus=I */
export const areateAuction = `${baseUrl}/kingsrings/api/v1/auction/admincreate`;
export const getAuctionById = `${baseUrl}/kingsrings/api/v1/auction/list/`; /** userId */
export const uploadImage = `${baseUrl}/kingsrings/api/v1/file/upload`;
export const approveUserAuction = `${baseUrl}/kingsrings/api/v1/auction/updatestatus`;
export const deleteAuction = `${baseUrl}/kingsrings/api/v1/auction/delete`;/** ?auctionId=2 */
export const getUserList = `${baseUrl}/kingsrings/api/v1/user/list`;
export const getEmailNotifications = `${baseUrl}/kingsrings/api/v1/emaillNotificatioin/list`;
export const getPushNotifications = `${baseUrl}/kingsrings/api/v1/pushNotification/list`;
export const getPromotionList = `${baseUrl}/kingsrings/api/v1/promotion/adminlist`;/** ?promotionPage=LOTTERY */
export const getDashboardData = `${baseUrl}/kingsrings/api/v1/dashboard/counts`;
export const getSettingsData = `${baseUrl}/kingsrings/api/v1/setting/list`;
export const updatedSettingsData = `${baseUrl}/kingsrings/api/v1/setting/update`;
export const getEmailNotificationList = `${baseUrl}/kingsrings/api/v1/email/list`;