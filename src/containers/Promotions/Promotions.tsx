import {FC, useState} from 'react';
import ViewHeader from '../../components/ViewHeader/ViewHeader';
import HomeSection from './Home';
import Auction from './Auction';
import Lottery from './Lottery';

import {Wrapper,BreadCrumbSection, ContentWrapper, TabMenuOptions, TabMenuOption} from './StyledPromotions';

const Promotions = () => {

    const [tabmenuArray, setTabmenuArray] = useState([
        {
            label:"Home",
            id:"homme",
            isSelected:true
        },
        {
            label:"Lottery",
            id:"lottery",
            isSelected:false
        },
        {
            label:"Auction",
            id:'auction',
            isSelected:false
        }
    ]);

    const toggleTabMenu = (menuId:string) => {
        setTabmenuArray(tabmenuArray.map((menuObj) => {
            return {
                ...menuObj,
                isSelected: menuId === menuObj.id
            }
        }))
    };

    let tabMenuView = tabmenuArray.map((menuObj) => {
        return <TabMenuOption onClick={() => {toggleTabMenu(menuObj.id)}} key={menuObj.id} isSelected={menuObj.isSelected} >
            {menuObj.label}
        </TabMenuOption>
    });

    let view = <div>loading...</div>;

   for (let menuObj of tabmenuArray) {
       if (menuObj.isSelected) {
           if (menuObj.id === "homme") {
            view = <HomeSection />;
           } else if (menuObj.id === "lottery") {
               view = <Lottery />
           } else {
            view = <Auction />
           }
           break;
       }
   }

    return <Wrapper>
        <BreadCrumbSection>
        <ViewHeader title={'Promotions'} />
        </BreadCrumbSection>
        <ContentWrapper>
            <TabMenuOptions>
                {tabMenuView}
            </TabMenuOptions>
            {view}
        </ContentWrapper>
    </Wrapper>
};

export default Promotions