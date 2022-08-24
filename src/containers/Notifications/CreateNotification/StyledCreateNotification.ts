import styled from 'styled-components';

export const Wrapper = styled.div`
width: 100%;
box-sizing: border-box;
`;

export const Container = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column wrap;
`;

export const FormSection = styled.div`
width: 100%;
box-sizing: border-box;
display: flex;
flex-flow: column;
align-items: flex-start;
justify-content: flex-start;
background-color: #ffffff;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
border-radius: 8px;
margin-top: 24px;
`;

export const SectionTitle = styled.div`
width: 100%;
box-sizing: border-box;
font-weight: 600;
font-size: 18px;
line-height: 27px;
color: #000000;
padding: 30px;
border-bottom: 1px solid #E9EDF5;
`;

export const FormBody = styled.div`
width: 100%;
box-sizing: border-box;
padding: 30px;
`;

export const RichTextEditorContainer = styled.div`
width: 100%;
box-sizing: border-box;
padding: 0 30px 30px 30px;
`;

export const UserListWrapper = styled.div`
width: 100%;
box-sizing: border-box;
position:relative;
padding: 0 30px 30px 30px;
`;

export const UserListInput = styled.input`
width: 100%;
box-sizing: border-box;
padding: 8px 16px;
font-size: 16px;
`;

export const UsersListWrapper = styled.div`
width: auto;
box-sizing: border-box;
position: absolute;
top: auto;
background-color: #ffffff;
z-index: 1;
`;

export const UserDetail = styled.div`
width: 100%;
box-sizing: border-box;
padding: 8px 16px;
`;

export const TagsWrapper = styled.div`
width: 100%;
box-sizing:border-box;
padding: 0 30px 30px 30px;
`;

export const TagWrapper = styled.div`
display: inline-flex;
flex-flow: row nowrap;
align-items: center;
justify-content: flex-start;
border: 1px solid #3957E8;
margin: 5px;
padding: 3px 6px;
border-radius: 4px;
`;

export const TagName = styled.div`
font-size: 16px;
margin-right: 5px;
font-size: 14px;
`;

export const CloseWrapper = styled.div`
padding-right: 5px;
border-left: 1px solid #cccccc;
padding-left: 7px;
font-size: 12px;
cursor: pointer;
`;