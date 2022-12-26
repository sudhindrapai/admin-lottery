import styled from 'styled-components';

interface MenuOption {
    isSelected: boolean
}

export const Img = styled.img`
width: 100%;
max-width: 100%;
object-fit: contain;
margin-bottom: 15px;
border-radius: 4px;
`;

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
`;

export const BreadCrumbSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
`;

export const ContentWrapper = styled.div`
width: 100%;
box-sizing: border-box;
background: #FFFFFF;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
padding: 12px 24px;
margin-top: 20px;
`;

export const TabMenuOptions = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
margin-bottom: 24px;
`;

export const TabMenuOption = styled.div`
font-weight: ${(props:MenuOption) => props.isSelected === true? '700':'500'};;
font-size: 14px;
line-height: ${(props:MenuOption) => props.isSelected === true? '20px':'22px'};;
padding: 12px 20px;
cursor: pointer;
color: ${(props:MenuOption) => props.isSelected === true? '#5E5ADB':'#464F60'};
border-bottom: 1px solid #E9EDF5;
border-bottom-color: ${(props:MenuOption) => props.isSelected === true? '#5E5ADB':'#464F60'};
border-bottom-width: ${(props:MenuOption) => props.isSelected === true? '2px':'1px'};
`;

export const SectionWrapper = styled.div`
width: 100%;
box-sizing: border-box;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
border-radius: 8px;
margin-bottom: 30px;
`;

export const SectionHeader = styled.div`
width: 100%;
box-sizing: border-box;
font-weight: 500;
font-size: 18px;
letter-spacing: 0.0024em;
color: #200E32;
padding: 24px;
border-bottom: 1px solid #E9EDF5;
`;

export const SectionBody = styled.div`
width: 100%;
box-sizing: border-box;
padding: 24px;
`;

export const StaticBannerSectionWrapper = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
`;

export const DesktopBannerSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-between;
padding: 24px;
margin-bottom: 24px;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
`;

export const BannerSectionTitle = styled.div`
font-weight: 500;
font-size: 14px;
letter-spacing: 0.0024em;
color: #200E32;
`;

export const BannerSectionSubtitle = styled.div`
font-weight: 500;
font-size: 12px;
letter-spacing: 0.0024em;
color: #C4C4C4;
margin-top: 2px;
`;

export const AddImageBtn = styled.div`
font-weight: 400;
font-size: 18px
letter-spacing: 0.0024em;
color: #3A57E8;
cursor: pointer;
`;

export const StaticFormSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column wrap;
align-items: flex-start;
justify-content: flex-start;
`;

export const SlidingImgUploaderSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: flex-start;
justify-content: flex-start;
gap: 20px;
`;

export const SlidingImgList = styled.div`
display: flex;
flex-flow: column wrap;
align-items: flex-start;
justify-content: flex-start;
flex-basis: 20%;
`;

export const SlidingImgItem = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
height: 100px;
background: ${(props:MenuOption) => props.isSelected === true? "rgba(58, 87, 232, 0.1);" : "#ffffff" };
border-bottom: 1px solid #ccc;
border-right: 1px solid #ccc;
cursor: pointer;
&:last-child{
    border-bottom: none;
}
`;

export const Count = styled.span`
font-size: 16px;
color: #3A57E8;
margin-right: 16px;
`;

export const ImgPlaceHolder = styled.div`
height: 50px;
width: 50px;
background: rgba(58, 87, 232, 0.1);
border: 1px solid rgba(58, 87, 232, 0.1);
border-radius: 4px;
`;

export const FormSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
flex-basis:80%;
`;