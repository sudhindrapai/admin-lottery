import {FC, Fragment} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';
import SlidingImgUploader from './SlidingImgUploader';

const Lottery:FC = () => {
    return <Fragment>
        <Wrapper title={"Slider Banner"}>
        <SlidingImgUploader />
    </Wrapper>
    <Wrapper title={"Static Banners"}>
        <StaticImageUploader />
    </Wrapper>
    </Fragment>
};

export default Lottery