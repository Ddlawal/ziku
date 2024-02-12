import { Button as CButton, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

const Button: FC<ButtonProps> = ({
    bg = 'primary',
    children,
    color = 'white.100',
    w = 'full',
    ...rest
}) => {
    return (
        <CButton
            bg={bg}
            color={color}
            w={w}
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 0.95 }}
            {...rest}
        >
            {children}
        </CButton>
    );
};

export default Button;
