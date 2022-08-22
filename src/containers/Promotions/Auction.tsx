import {FC, Fragment} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';
import SlidingImgUploader from './SlidingImgUploader';

interface AuctionProps {
    auctionPromotionList: any
}

const Auction:FC<AuctionProps> = (props) => {
    const {auctionPromotionList} = props;

    const staticImgObj = auctionPromotionList.filter((filterObj) => {
        return filterObj.promotionType === "STATIC"
    })[0];

    const slidingImgs = auctionPromotionList.filter((filterObj) => {
        return filterObj.promotionType !== "STATIC"
    });
    return <Fragment>
        <Wrapper title={"Slider Banner"}>
        <SlidingImgUploader slidingImgs={slidingImgs} />
    </Wrapper>
    <Wrapper title={"Static Banners"}>
        <StaticImageUploader  details={staticImgObj} bannerRedirectionUrl={""} />
    </Wrapper>
    </Fragment>
};

export default Auction