import {FC} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';
const Home:FC = () => {
    return <Wrapper title={"Static Banner"}>
        <StaticImageUploader />
    </Wrapper>
};

export default Home