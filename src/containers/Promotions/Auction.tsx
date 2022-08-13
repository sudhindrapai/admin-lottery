import {FC, Fragment} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';
import SlidingImgUploader from './SlidingImgUploader';

const Auction:FC = () => {
    return <Fragment>
        <Wrapper title={"Slider Banner"}>
        <SlidingImgUploader />
    </Wrapper>
    <Wrapper title={"Static Banners"}>
        {/* <StaticImageUploader /> */}
    </Wrapper>
    </Fragment>
};

export default Auction