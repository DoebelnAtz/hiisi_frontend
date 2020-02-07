import styled from 'styled-components'
import {color, components, layout} from "../../../Styles/sharedStyles";
import { animated } from 'react-spring'


export const BackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const LoginDiv = styled(animated.div)`
    width: 20vw;
    margin: auto;
    display: flex;
    height: 20vw;
    border-radius: 10vw;
    background-color: ${ color.primary };
    z-index: 3;
`;

export const InputDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 46%; 
`;

export const UsernameDiv = styled.div`
    ${layout.row};
`;

export const UsernameInput = styled.input`
  ${components.input}
`;

export const PasswordDiv = styled.div`
    margin: 10px 0;
    ${layout.row};
`;

export const PasswordInput = styled.input`
  ${components.input}
`;

export const LoginButton = styled.div`
  ${layout.row};
  & button {
    margin: 0 auto;
  }
`;

export const OrangeDiv = styled(animated.div)`
    width: 20vw;
    height: 20vw;
    border-radius: 10vw;
    
    background-color: ${color.secondary};
    z-index: 1;
`;

export const GreenDiv = styled(animated.div)`
    width: 20vw;
    height: 20vw;
    border-radius: 10vw;
    
    background-color: ${color.tertiary};
    z-index: 1;
`;

export const HelperDiv = styled(animated.div)`
    top: calc(50% - 10vw);
    left: 40vw;
    position: absolute;
`;

export const HelperOrangeDiv = styled(animated.div)`
    top: calc(50% - 10vw);
    left: 40vw;
    position: absolute;
`;
