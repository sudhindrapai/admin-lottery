import {FC, useState} from 'react';
import StaticImageUploader from './StaticImageUploader';
import {SlidingImgUploaderSection, SlidingImgList, 
    SlidingImgItem, Count, ImgPlaceHolder, FormSection} from './StyledPromotions';

const imagesList = [
    {
        imgUrl:"",
        position:1,
        isSelected: true,
    },
    {
        imgUrl:"",
        position:2,
        isSelected: false
    },
    {
        imgUrl:"",
        position:3,
        isSelected: false
    },
    {
        imgUrl:"",
        position:4,
        isSelected: false
    },
    {
        imgUrl:"",
        position:5,
        isSelected: false
    },
    {
        imgUrl:"",
        position:6,
        isSelected: false
    }
];

const SlidingImgUploader = () => {
    const [images, setImgsList] = useState(imagesList);

    const toggleSlidingItems = (position:number) => {
        setImgsList(images.map((imgObj) => {
            return {
                ...imgObj,
                isSelected:imgObj.position === position
            }
        }));
    }

    let imagesListView = images.map((imgObj, index) => {
        return <SlidingImgItem onClick={() => {toggleSlidingItems(imgObj.position)}} 
        isSelected={imgObj.isSelected} >
            <Count>
                {index + 1}
            </Count>
            <ImgPlaceHolder />
        </SlidingImgItem>
    })
    return <SlidingImgUploaderSection>
        <SlidingImgList>
        {imagesListView}
    </SlidingImgList>
    <FormSection>
        {/* <StaticImageUploader /> */}
    </FormSection>
    </SlidingImgUploaderSection>
};

export default SlidingImgUploader