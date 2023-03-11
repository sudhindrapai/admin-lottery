import {memo,FC} from 'react';
import loaderImgSrc from '../../assets/images/loader.gif';
import {Wrapper,LoadingImg} from './StyledLoader'
interface LoaderProps{
    isLoading: boolean
}

const Loader:FC<LoaderProps> = (props) => {
    return <>{props.isLoading && <Wrapper>
        <LoadingImg src={loaderImgSrc} />
    </Wrapper>}</>
};

export default Loader