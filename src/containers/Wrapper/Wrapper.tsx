import {FC} from 'react';

import {StyledAppWrapper, LeftMenuSection, ContentWrapper, Content} from './StyledWrapper';
import LeftMenu from '../LeftMenu/Leftmenu';
import TopBar from '../../components/AppTopbar/AppTopBar';

interface AppWrapper {
    children: any
}

const Wrapper:FC<AppWrapper> = ({children}) => {
    return <StyledAppWrapper>
            <LeftMenuSection>
                <LeftMenu />
            </LeftMenuSection>
            <ContentWrapper>
                <TopBar />
                <Content>
                    {children}
                </Content>
            </ContentWrapper>
    </StyledAppWrapper>
};

export default Wrapper