import {FC} from 'react';
import {StyledButton, PrimaryBtnFilled, PrimaryBtnLink, SecondaryBtn} from './StyledButton';

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

interface ButtonProps {
    title: string,
    btnSize: ButtonSize,
    btnVariant: ButtonVariant
    clicked(): void
}

const Button:FC<ButtonProps> = (props) => {
    const {title,btnSize, btnVariant, clicked} = props;

    let btn = <></>;

    if (btnVariant === "primary-filled") {
        btn = <PrimaryBtnFilled btnSize={btnSize} onClick={clicked} >
{title}
        </PrimaryBtnFilled>
    } else if (btnVariant === "primaryLink") {
        btn = <PrimaryBtnLink btnSize={btnSize} onClick={clicked}>
            {title}
        </PrimaryBtnLink>
    } else if (btnVariant === "secondary") {
        btn = <SecondaryBtn btnSize={btnSize} onClick={clicked} >
{title}
        </SecondaryBtn>
    }

    return btn
};

export default Button