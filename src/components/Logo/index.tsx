import { Image, ImageProps } from '@chakra-ui/react';
import { FC } from 'react';

import logo from '../../assets/logo.svg';

const Logo: FC<ImageProps> = ({ width = '100px', ...rest }) => (
    <Image src={logo} width={width} {...rest} />
);

export default Logo;
