import styled from 'styled-components'

export const Avatar = styled.img`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border: ${props => props.borderSize}px solid ${props => props.borderColor};
    -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
`;
