import {FC} from 'react';
import {SectionWrapper, SectionHeader, SectionBody} from './StyledPromotions'

interface SectionProps{
    title:string
}

const SectionWrapperView:FC<SectionProps> = ({title, children}) => {
    return <SectionWrapper>
        <SectionHeader>
            {title}
        </SectionHeader>
        <SectionBody>
            {children}
        </SectionBody>
    </SectionWrapper>
};

export default SectionWrapperView