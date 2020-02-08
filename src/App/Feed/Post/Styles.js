import styled from 'styled-components';
import { color, length } from '../../../Styles/sharedStyles';

export const BlogPost = styled.div`
	margin: 0 ${length.margin} ${length.margin} ${length.margin};
    max-width: 100%;
    border-radius: ${length.radius};
    border: 1px solid ${color.primary};
    background-color: ${color.siteBG1};
`;
