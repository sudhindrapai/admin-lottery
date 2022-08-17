import {FC} from 'react';
import Wrapper from './SectionWrapper';
import StaticImageUploader from './StaticImageUploader';

interface HomeProps{
    details:any,
    bannerRedirectionUrl:string
}

const Home:FC<HomeProps> = ({details, bannerRedirectionUrl}) => {

    return <Wrapper title={"Static Banner"}>
        <StaticImageUploader bannerRedirectionUrl={bannerRedirectionUrl} details={details[0]} />
    </Wrapper>
};

export default Home