import styled from 'styled-components'

import { layout, color, length, font } from '../../../Styles/SharedStyles';

export const ProfilePageDiv = styled.div`
	height: 100%;
	width: 100%;
`;

export const ProfileHead = styled.div`
	${layout.col};
	border-radius: ${length.radius};
	margin: ${length.margin};
`;

export const ProfileStats = styled.div`
	background-color: ${color.siteBG2};
	padding: ${length.margin};
`;

export const ProfileInfo = styled.div`
	margin-top: 40px;
	margin-left: 30px;
	& span {
		${layout.row};
	}
	@media (max-width: 768px) {
		margin-top: 20px;
		margin-left: 10px;
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
	height: 130px;	
	@media (max-width: 768px) {
		height: 80px;	
	}
`;

export const ProfilePic = styled.img`
	height: 120px;
	width: 120px;
	position: relative;
	top: 50px;
	left: 40px;
	border-radius: 50%;
	border: 5px solid ${color.siteBG2};
	@media (max-width: 768px) {
		height: 60px;
		width: 60px;
		top: 35px;
		left: 20px;
	}
`;

export const ProfileButtonRow = styled.div`
	margin: 0 0 ${length.margin} ${length.margin};
	${layout.row};
`;
