import styled, { css } from 'styled-components';
import Color from 'color';

export const color = {
    primary: '#AC7BC2',
    secondary: '#E0AB79',
    tertiary: '#86D889',
    siteBG: '#161616',
    siteBG1: Color('#161616').lighten(0.5).string(),
    siteBG2: Color('#161616').lighten(1).string(),
    siteBG3: Color('#161616').lighten(1.5).string(),
    siteBG4: Color('#161616').lighten(2).string(),
    siteBG5: Color('#161616').lighten(2.5).string(),
};

export const colorAdjust = {
    darken: (color, amount) =>
        Color(color)
            .darken(amount)
            .string(),
    lighten: (color, amount) =>
        Color(color)
            .lighten(amount)
            .string(),
    rgba: (color, opacity) =>
        Color(color)
            .alpha(opacity)
            .string()
};

export const length = {
    margin: '10px',
    radius: '4px'
};

export const font = {
    title: css`
      font-family: Share Tech, sans-serif;
      font-size:36px;
      letter-spacing: 2px;
    `,
    text: css`
      color: white;
      letter-spacing: 1px;
    `,

};

export const border = {
    setBorders: (top, right, bot, left, color) => (
        css`
            border-color: ${color};
            border-style: solid;
            border-width: ${top}px ${right}px ${bot}px ${left}px;
        `
    )
};

export const cursor = {
    clickable: css`
      cursor: pointer;
      user-select: none;
    `,
    draggable: css`
      cursor: grab;
      user-select: none;
    `,
    dragging: css`
      cursor: grabbing;
    `,
    notAllowed: css`
		cursor: not-allowed;
		user-select: none;
	`,
};

export const components = {
    notificationIcon: css`
        height: 14px;
		width: 14px;
		margin: auto 10px auto auto;
		border-radius: 50%;
		background-color: ${color.secondary};
		z-index: 6;
		display: block;
    `,
    input: css`
        border-radius: 4px;
        padding-left: 10px;
        background-color: ${color.siteBG1};
        color: ${color.primary};
        height: 36px;
        border: 1px solid ${color.primary};
        &:focus {
            outline: none;
            border: 1px solid ${colorAdjust.darken(color.primary, 0.2)};
        }
    `,
    button: css`
        padding: 2px 7px;
        font-size: 16px;
        height: 34px;
        background-color: ${color.siteBG3};
        color: ${color.primary};
        ${cursor.clickable};
        border: 1px solid ${color.primary};
        border-radius: 5px;
        transition: background-color 0.1s;
        &:focus {
          outline: none;
        }
        &:hover {
          background-color: ${color.siteBG2};
        }
    `,
    textarea: css`
      color: white;
      padding: 5px;
      ${font.text};
      &:focus {
        box-shadow: none;
        outline: none;
      }
    `,

};

export const layout = {
    row: css`
        display: flex;
        flex-wrap: wrap;
    `,
    col: css`
        flex-basis: 0;
        flex-grow: 1;
        
        max-width: 100%;
    `,
    centered: css`

        margin-left: auto;
        margin-right: auto;
    `
};


