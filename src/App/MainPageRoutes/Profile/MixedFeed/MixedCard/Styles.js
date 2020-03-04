import styled from 'styled-components';
import { color, font, layout, length } from '../../../../../Styles/SharedStyles';

export const Thumbnail = styled.div`
	width: 54px;
	height: 54px;
	margin-right: ${length.margin};
	border-radius: ${length.radius};
	background-image: url(${(props) => props.src});
	background-size: 54px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${color.siteBG1};
`;

export const MixedTitleType = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 130px);
`;


export const MixedTitle = styled.span`
	width: 100%;
	${layout.row};
	font-size: 18px;
`;

export const MixedTitleInfo = styled.div`
	${layout.row};
	width: calc(100% - ${(props) => (props.full ? '0px' : '64px')});
`;

export const MixedType = styled.span`
	${font.text};
	font-size: 14px;
	margin-top: 5px;

`;
