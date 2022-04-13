import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
import backgroundSvg from '../../assets/images/light-mode-bg.svg';
import darkBackgroundSvg from '../../assets/images/dark-mode-bg.svg'

export const customTheme=extendTheme({
    styles:{
        global:props=>({
            html:{
                minH:'100%'
            },
            body:{
            backgroundImage:mode(backgroundSvg,darkBackgroundSvg )(props),
            backgroundRepeat:'no-repeat',
            bgSize:'100%',
            height:'100%'
        }
        })
        
    }
})