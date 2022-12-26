import {FC, useMemo, useRef} from 'react';
import {Wrapper, Container, TitleWrapper, Title, AddBtn, EmptyImgSection,
     Image, ImageWrapper, IndImgWrapper, DeleteIcon} from './StyledImageUploader';
import {RootState} from '../../app/Store';
import {uploadImage,deleteImage} from '../../features/imageUploaderSlice';
import {useSelector, useDispatch} from 'react-redux';

const ImageUploader:FC = () => {

    const dispatch = useDispatch();

    const imageUploaderRef = useRef<HTMLInputElement>(null);

    const images = useSelector((state:RootState) => state.images.images);


    const deleteImg = (url:string) => {
        dispatch(deleteImage({
            imgUrl:url
        }));
    }

    let imagesView = useMemo(() => {
        if (images !== null && images.length === 0) {
            return <EmptyImgSection>
                <div>No Images Found</div>
            </EmptyImgSection>
        } else{
            <EmptyImgSection>
                <div>No Images Found</div>
            </EmptyImgSection>
        }
    },[images]);

    let imageList:any = <></>;

    if (images !== null && images.length > 0) {
         imageList = images !== null && images.map((imgUrl:string) =>{
            return <IndImgWrapper>
                <DeleteIcon onClick={() => {deleteImg(imgUrl)}}>
                    D
                </DeleteIcon>
                <Image src={imgUrl} alt={"Image"} />
                </IndImgWrapper>
        });
    } else {
        imageList = <EmptyImgSection>
        <div>No Images Found</div>
    </EmptyImgSection>
    }


    const triggerImageUploader = () => {
        imageUploaderRef.current?.click();
    }

    const createUploadFileObj = (event) => {
        uploadFile(event.target.files[0]);
    }

    const uploadFile = (files: any) => {
        console.log(files,"[uploadFile]")
        const formData = new FormData();
        formData.append("file", files);
        formData.append('documentName',files.name);
        dispatch(uploadImage(formData));
    }

    return <Wrapper>
        <Container>
            <input type={"file"} tabIndex={0} ref={imageUploaderRef} 
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
            {images !== null && images.length === 0 ? imagesView: <ImageWrapper>{imageList}</ImageWrapper>}
        </Container>
    </Wrapper>
};

export default ImageUploader