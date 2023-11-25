import React from 'react';
import RMBorderShine from '../RMBorderShine/RMBorderShine';
import styles from './RMTooltip.module.scss'

export default function RMTooltip(props: RMTooltipProps){
    const width = props.width ?? 200;

    const containerStyles = styles['tooltip-container'] + (props.open ? ' ' + styles['open'] : '');
    const textStyles = styles['tooltip-text'] + (props.open ? ' ' + styles['open'] : '');
    return (
        <div className={containerStyles} style={{width: width, marginLeft: -width/2}}>
            <div className={textStyles}>
                <RMBorderShine shineColor='#e22f76' backgroundColor='black' shineWidth={20}>{props.text}</RMBorderShine>
                
                </div>
        </div>
    );
}

export interface RMTooltipProps{
    text: string;
    open?: boolean;
    width?: number;
    hoverOnParentOnly?: boolean;
}