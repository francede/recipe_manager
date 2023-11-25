import React, { useState } from 'react';
import styles from './RMIcon.module.scss'
import localFont from 'next/font/local'
import RMTooltip, { RMTooltipProps } from '../RMTooltip/RMTooltip';

const googleIcons = localFont({src: '../../fonts/MaterialIconsRound-Regular.otf'})

export default function RMIcon(props: RMIconProps){
    const classes = [googleIcons.className, styles.icon]

    return (
        <span className={classes.join(' ')} style={{fontSize: props.fontSize}}>{props.children}</span>
    );
}

export interface RMIconProps{
    children?: string;
    fontSize?: string;
}