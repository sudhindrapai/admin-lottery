import {FC, useEffect, useState} from 'react';
import ViewHeader from '../../components/ViewHeader/ViewHeader';
import HomeSection from './Home';
import Auction from './Auction';
import Lottery from './Lottery';

import {Wrapper,BreadCrumbSection, ContentWrapper, TabMenuOptions, TabMenuOption} from './StyledPromotions';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../app/Store';
import {getPromotionList} from '../../features/promotions';

const Promotions = () => {

    const dispatch = useDispatch();

    const homePromotionList = useSelector((state:RootState) => state.promotions.home);
    const homePageRedirectionUrl = useSelector((state:RootState) => state.promotions.homeBannerRedirectionUrl);
    const lotteryPromotionList = useSelector((state:RootState) => state.promotions.lottery);
    const auctionPromotionList = useSelector((state:RootState) => state.promotions.auction);

    useEffect(() => {
        let activeViewObj = tabmenuArray.filter((tabObj) => {
            return tabObj.isSelected;
        })
        getPromotionDetails(activeViewObj[0].queryParam)
    },[])

    const getPromotionDetails = (pageName:string) => {
        dispatch(getPromotionList(pageName))
    }

    const [tabmenuArray, setTabmenuArray] = useState([
        {
            label:"Home",
            id:"homme",
            isSelected:false,
            queryParam:"HOME"
        },
        {
            label:"Lottery",
            id:"lottery",
            isSelected:true,
            queryParam:"LOTTERY"
        },
        {
            label:"Auction",
            id:'auction',
            isSelected:false,
            queryParam:"AUCTION"
        }
    ]);

    const toggleTabMenu = (menuId:string) => {
        setTabmenuArray(tabmenuArray.map((menuObj) => {
            if (menuId === menuObj.id) {
                getPromotionDetails(menuObj.queryParam);
            }
            return {
                ...menuObj,
                isSelected: menuId === menuObj.id
            }
        }));
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
            view = <HomeSection bannerRedirectionUrl={homePageRedirectionUrl} details={homePromotionList} />;
           } else if (menuObj.id === "lottery") {
               view = <Lottery lotteryPromotionList={lotteryPromotionList} />
           } else {
            view = <Auction auctionPromotionList={auctionPromotionList} />
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