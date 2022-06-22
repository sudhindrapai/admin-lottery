import {FC, useMemo} from 'react';
import {Wrapper, Container, TitleWrapper, Title, AddBtn, EmptyImgSection} from './StyledImageUploader';
import {RootState} from '../../app/Store';
import {useSelector, useDispatch} from 'react-redux';

const ImageUploader:FC = () => {

    const dispatch = useDispatch();

    const images = useSelector((state:RootState) => state.images.images);

    let imagesView = useMemo(() => {
        if (images.length === 0) {
            return <EmptyImgSection>
                <div>No Images Found</div>
            </EmptyImgSection>
        }
    },[images]) 

    return <Wrapper>
        <Container>
            <TitleWrapper>
                <Title>
                    Images
                </Title>
                <AddBtn>
                    Add images
                </AddBtn>
            </TitleWrapper>
            {imagesView}
        </Container>
    </Wrapper>
};

export default ImageUploader