import { css } from 'styled-components';
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

export const length = {
    margin: '10px',
    radius: '4px'
};

export const font = {
    title: 'font-family: Share Tech, sans-serif;'
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

export const cursor = {
    clickable: css`
      cursor: pointer;
      user-select: none;
    `,
    draggable: css`
      cursor: grab;
    `,
    dragging: css`
      cursor: grabbing;
    `,
};