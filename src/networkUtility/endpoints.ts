// const baseUrl = "https://41539805-3c3c-4956-a915-281ef555f98c.mock.pstmn.io";
const baseUrl ="http://192.169.179.206:9092"

export const login = `${baseUrl}/kingsrings/auth/login`; /** Method: POST */
export const getLotteryList = `${baseUrl}/kingsrings/api/v1/lotterygame/adminlist`; /** ?lotteryType=A */
export const createLottery = `${baseUrl}/kingsrings/api/v1/lottery/create`;
export const getTemplateList = `${baseUrl}/kingsrings/api/v1/lottery/list`; /** ?lotteryType=A */
export const getSingleTemplateDetail = `${baseUrl}/kingsrings/api/v1/lottery/list/`; /** {{lotteryId}} */