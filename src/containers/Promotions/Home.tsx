import {FC} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';

interface HomeProps{
    details:any
}

const Home:FC<HomeProps> = ({details}) => {

    return <Wrapper title={"Static Banner"}>
        <StaticImageUploader details={details[0]} />
    </Wrapper>
};

export default Home