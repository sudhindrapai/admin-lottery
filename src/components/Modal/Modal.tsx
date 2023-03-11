import {FC} from 'react';
import Modal from '@mui/material/Modal';
import {StyledBox, ModalHeadre, HeaderTitle, CloseIcon} from './StyledModal';

interface ModalProps {
  isOpen: boolean,
  name:string,
  title: string,
  toggleModal():void
}

const ModalComponent:FC<ModalProps> = (props) => {
  const {isOpen, name, title, children, toggleModal} = props;
    return <Modal
    open={isOpen}
    onClose={toggleModal}
    aria-labelledby={name}
    aria-describedby={name}
  >
    <StyledBox>
        <ModalHeadre>
            <HeaderTitle>
                {title}
            </HeaderTitle>
            <CloseIcon onClick={toggleModal} />
        </ModalHeadre>
        {children}
    </StyledBox>
  </Modal>
};

export default ModalComponent