import {FC, useState, useEffect} from 'react';
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

interface SlidingImgProps {
    slidingImgs:any
}

const SlidingImgUploader:FC<SlidingImgProps> = (props) => {
    const {slidingImgs} = props;

    const [images, setImgsList] = useState(imagesList);
    const [activeSlidingObj, setActiveSlidingObj] = useState({});

    useEffect(() => {
        if (slidingImgs.length > 0) {
            let updatedSlidingList = slidingImgs.map((imgObj,index) => {
                let updateObj = {
                    ...imgObj,
                    isSelected: index === 0,
                    position:index + 1
                }
                if (index === 0) {
                    setActiveSlidingObj(updateObj)
                }
                return updateObj;
            });
            setImgsList(updatedSlidingList)
            console.log(slidingImgs,"slidingImgs")
        }
    },[slidingImgs])

    const toggleSlidingItems = (position:number) => {
        setImgsList(images.map((imgObj) => {

            let updatedObj = {};
            if (imgObj.position === position) {
                updatedObj["isSelected"] = true;
                setActiveSlidingObj(updatedObj)
            }

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
    });

    console.log(activeSlidingObj,"activeSlidingObj")

    return <SlidingImgUploaderSection>
        <SlidingImgList>
        {imagesListView}
    </SlidingImgList>
    <FormSection>
        <StaticImageUploader details={activeSlidingObj} bannerRedirectionUrl={""} />
    </FormSection>
    </SlidingImgUploaderSection>
};

export default SlidingImgUploader