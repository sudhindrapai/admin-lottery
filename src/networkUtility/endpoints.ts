// const baseUrl = "https://41539805-3c3c-4956-a915-281ef555f98c.mock.pstmn.io";
const baseUrl ="http://192.169.179.206:9092"

export const login = `${baseUrl}/kingsrings/auth/login`; /** Method: POST */
export const getLotteryList = `${baseUrl}/kingsrings/api/v1/lotterygame/adminlist`; /** ?lotteryType=A */
export const createLottery = `${baseUrl}/kingsrings/api/v1/lottery/create`;
export const getTemplateList = `${baseUrl}/kingsrings/api/v1/lottery/list`; /** ?lotteryType=A */
export const getSingleTemplateDetail = `${baseUrl}/kingsrings/api/v1/lottery/list/`; /** {{lotteryId}} */
export const getLotteryGameById = `${baseUrl}/kingsrings/api/v1/lotterygame/list/`; /** lottery game id */
export const getApprovedAuctionList = `${baseUrl}/kingsrings/api/v1/auction/adminlist`; /** ?auctionStatus=U */
export const getAuctionRequestList = `${baseUrl}/kingsrings/api/v1/auction/adminapprovallist`;/** ?auctionStatus=I */
export const areateAuction = `${baseUrl}/kingsrings/api/v1/auction/admincreate`;
export const getAuctionById = `${baseUrl}/kingsrings/api/v1/auction/list/`; /** userId */
export const updateAdminAuction = `${baseUrl}/kingsrings/api/v1/auction/adminupdate`;
export const updateUserAuction = `${baseUrl}/kingsrings/api/v1/auction/updatestatus`;
export const uploadImage = `${baseUrl}/kingsrings/api/v1/file/upload`;
export const approveUserAuction = `${baseUrl}/kingsrings/api/v1/auction/updatestatus`;
export const deleteAuction = `${baseUrl}/kingsrings/api/v1/auction/delete`;/** ?auctionId=2 */
export const getUserList = `${baseUrl}/kingsrings/api/v1/user/list`;
export const getEmailNotifications = `${baseUrl}/kingsrings/api/v1/emaillNotificatioin/list`;
export const getPushNotifications = `${baseUrl}/kingsrings/api/v1/pushNotification/list`;
export const getPromotionList = `${baseUrl}/kingsrings/api/v1/promotion/adminlist`;/** ?promotionPage=LOTTERY */
export const updatePromotionSection = `${baseUrl}/kingsrings/api/v1/promotion/update`;
export const getDashboardData = `${baseUrl}/kingsrings/api/v1/dashboard/counts`;
export const getSettingsData = `${baseUrl}/kingsrings/api/v1/setting/list`;
export const updatedSettingsData = `${baseUrl}/kingsrings/api/v1/setting/update`;
export const getEmailNotificationList = `${baseUrl}/kingsrings/api/v1/email/list`;
export const getEmailNotificationDetail = `${baseUrl}/kingsrings/api/v1/email/list/`/**7; email notificationId */
export const deleteEmailNotificationEndPoint = `${baseUrl}/kingsrings/api/v1/email/delete`; /** ?emailNotificationId=7 */
export const createEmailNotification = `${baseUrl}/kingsrings/api/v1/email/create`;
export const updateLottery = `${baseUrl}/kingsrings/api/v1/lottery/update`;
export const publishLottery = `${baseUrl}/kingsrings/api/v1/lottery/publish/`; /** 17 - template id */
export const getUserCount = `${baseUrl}/kingsrings/api/v1/dashboard/activeuserscount`;
export const removeLotteryTemplate = `${baseUrl}/kingsrings/api/v1/lottery/delete`; /** ?lotteryId=4 */
export const verifyOtp = `${baseUrl}/kingsrings/auth/verify`;