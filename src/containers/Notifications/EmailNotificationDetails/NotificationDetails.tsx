import {FC, useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {RootState} from '../../../app/Store';
import Button from '../../../components/UI/Button/Button';
import {useSelector, useDispatch} from 'react-redux';
import {deleteEmailNotification,getNotificationDetail,updateDeleteStatus} from '../../../features/emailNotifications';
import {transformDate} from '../../../Utility/Utility';
import ViewHeader from '../../../components/ViewHeader/ViewHeader';
import {adminRouts} from '../../../routs';
import {Wapper,Form, ElementWrapper, TwoElements, Label, Value} from './StyledNotificationDetail'

enum ButtonSize {
    sm = "small",
    md = "medium",
    lg = "large"
}
enum ButtonVariant {
    primaryFilled = "primary-filled",
    secondary = "secondary",
    primaryLink = "primaryLink"
}

const NotificatoinDetail:FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {notificationId} = useParams();

    const detail:any = useSelector((state:RootState) => state.emailNotifications.emailNotificationDetail);
    const isDeleted = useSelector((state:RootState) => state.emailNotifications.isDeleted);

    useEffect(() => {
        if (notificationId !== null && notificationId !== undefined) {
            dispatch(getNotificationDetail(parseInt(notificationId)))
        }
    },[notificationId]);

    useEffect(() => {
        if (isDeleted) {
            navigate(adminRouts.emailNotificationList);
            return () => {
                dispatch(updateDeleteStatus({isDeleted:false}));
            }
        }
    },[isDeleted])

    let view = <div></div>

        if ( Object.keys(detail).length > 0) {
            let emailSub = <ElementWrapper>
            <Label>
                Subject
            </Label>
            <Value>
                {detail.emailSubject}
            </Value>
        </ElementWrapper>;

        let emailBody = <ElementWrapper>
        <Label>
            Body
        </Label>
        <Value>
            {detail.emailBody}
        </Value>
    </ElementWrapper>

    let scheduleDateAndUserType = <TwoElements>
        <ElementWrapper>
        <Label>
            Schedule Date
        </Label>
        <Value>
            {transformDate(detail.emailScheduleDate)}
        </Value>
    </ElementWrapper>
    <ElementWrapper>
        <Label>
            User Type
        </Label>
        <Value>
            {detail.emailUserType}
        </Value>
    </ElementWrapper>
    </TwoElements>;

    view = <>
    {emailSub}
    {emailBody}
    {scheduleDateAndUserType}
    </>
        }

        const deleteEmail = () => {
            dispatch(deleteEmailNotification(`emailNotificationId=${notificationId}`))
        }

    return <>
    <ViewHeader title={`Email details / ${notificationId}`} 
    isBackButtonRequired={true} backButtonRedirectionUrl={adminRouts.emailNotificationList} /> 
    <Wapper>
        <Form>
        {view}
        </Form>
        {detail.isActive && 
        <Button title={"Delete Notification"} 
        btnSize={ButtonSize.md} btnVariant={ButtonVariant.primaryFilled} 
        clicked={deleteEmail} />}
    </Wapper> </>
};

export default NotificatoinDetail