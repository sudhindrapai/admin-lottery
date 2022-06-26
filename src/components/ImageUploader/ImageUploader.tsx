import {FC, useMemo, useRef} from 'react';
import {Wrapper, Container, TitleWrapper, Title, AddBtn, EmptyImgSection} from './StyledImageUploader';
import {RootState} from '../../app/Store';
import {uploadImage} from '../../features/imageUploaderSlice';
import {useSelector, useDispatch} from 'react-redux';

const ImageUploader:FC = () => {

    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const images = useSelector((state:RootState) => state.images.images);

    let imagesView = useMemo(() => {
        if (images.length === 0) {
            return <EmptyImgSection>
                <div>No Images Found</div>
            </EmptyImgSection>
        }
    },[images]);

    const triggerImageUploader = () => {
        inputRef.current?.click();
    }

    const createUploadFileObj = (event) => {
        uploadFile(event.target.files[0]);
    }

    const uploadFile = (files: any) => {
        const formData = new FormData();
        formData.append("file", files);
        formData.append('documentName',files.name);
        dispatch(uploadImage(formData));
    }

    return <Wrapper>
        <Container>
            <input type={"file"} ref={inputRef} 
            style={{display: 'none'}}
            onChange={(event) => {
            createUploadFileObj(event);
          }}
          accept="image/jpeg, image/png, image/jpg, image/tiff" />
            <TitleWrapper>
                <Title>
                    Images
                </Title>
                <AddBtn onClick={triggerImageUploader}>
                    Add images
                </AddBtn>
            </TitleWrapper>
            {imagesView}
        </Container>
    </Wrapper>
};

export default ImageUploader