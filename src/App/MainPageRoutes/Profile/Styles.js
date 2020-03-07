import styled from 'styled-components'

import { layout, color, length, font } from '../../../Styles/SharedStyles';

export const ProfilePageDiv = styled.div`
	height: 100%;
	width: 100%;
`;

export const ProfileHead = styled.div`
	${layout.col};
	height: 30%;
	border-radius: ${length.radius};
	margin: ${length.margin};
`;

export const ProfileStats = styled.div`
	background-color: ${color.siteBG2};
	height: calc(40% - ${length.margin} * 2);
	padding: ${length.margin};
	overflow-y: auto;
`;

export const ProfileInfo = styled.div`
	position: relative;
	top: 50px;
	& span {
		${layout.row};
	}
`;

export const ProfileUsername = styled.span`
	${font.text};
	font-size: 22px;
`;

export const ProfileText = styled.span`
	${font.text};
`;

export const ProfileBackground = styled.div`
	background-image: URL(${props => props.src});
	background-size: cover;
	border-radius: ${length.radius} ${length.radius} 0 0;
	background-position: right;
	width: calc(100%);
	height: 60%;	
`;

export const ProfilePic = styled.img`
	height: 120px;
	width: 120px;
	position: relative;
	top: calc(100% - 80px);
	left: 60px;
	border-radius: 50%;
	border: 5px solid ${color.siteBG2};
`;

export const ProfileButtonRow = styled.div`
	margin: 0 0 ${length.margin} ${length.margin};
	${layout.row};
`;
