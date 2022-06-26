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