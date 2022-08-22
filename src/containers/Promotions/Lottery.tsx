import {FC, Fragment} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';
import SlidingImgUploader from './SlidingImgUploader';

interface LotteryProps{
    lotteryPromotionList:any
}

const Lottery:FC<LotteryProps> = (props) => {
    const {lotteryPromotionList} = props;

    const staticImgObj = lotteryPromotionList.filter((filterObj) => {
        return filterObj.promotionType === "STATIC"
    })[0];

    const slidingImgs = lotteryPromotionList.filter((filterObj) => {
        return filterObj.promotionType !== "STATIC"
    });

    return <Fragment>
        <Wrapper title={"Slider Banner"}>
        <SlidingImgUploader slidingImgs={slidingImgs} />
    </Wrapper>
    <Wrapper title={"Static Banners"}>
        <StaticImageUploader details={staticImgObj} bannerRedirectionUrl={''} />
    </Wrapper>
    </Fragment>
};

export default Lottery