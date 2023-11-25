import React, { useState } from 'react';
import styles from './RMIconButton.module.scss'
import localFont from 'next/font/local'
import RMTooltip, { RMTooltipProps } from '../RMTooltip/RMTooltip';

const googleIcons = localFont({src: '../../fonts/MaterialIconsRound-Regular.otf'})

export default function RMIconButton(props: RMIconButtonProps){
    let [hovered, setHovered] = useState(false);
    const buttonClasses = [styles.button, googleIcons.className];
    const containerClasses = [styles.container];
    if(props.small) {
        buttonClasses.push(styles.small);
        containerClasses.push(styles.small);
    }

    switch((props.disabled && 'disabled') || props.color){
        case 'primary':
            buttonClasses.push(styles['theme-primary']);
            break;
        case 'secondary':
            buttonClasses.push(styles['theme-secondary']);
            break;
        case 'error':
            buttonClasses.push(styles['theme-error']);
            break;
        case 'disabled':
            buttonClasses.push(styles['theme-disabled']);
            break;
    }

    const getTooltip = () => {
        if(props.tooltipOptions){
            return <RMTooltip open={hovered} text={props.tooltipOptions.text} width={props.tooltipOptions.width}></RMTooltip>
        }
    }

    const getOnClick = () => {
        if(!props.disabled) return props.onClick;
    }

    return (
        <div className={containerClasses.join(' ')}>
            <div className={styles['tooltip']}>
                {getTooltip()}
            </div>
            {
            props.isLink
                ? 
                <a className={buttonClasses.join(' ')} onClick={getOnClick()}  
                    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        {props.children}
                </a>
                : 
                <button className={buttonClasses.join(' ')} onClick={getOnClick()} 
                    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        {props.children}
                </button>
            }
        </div>
    );
}

export interface RMIconButtonProps{
    tooltipOptions?: RMTooltipProps;
    isLink?: boolean;
    onClick?: (event: any) => void;
    children?: string;
    color?: 'primary' | 'secondary' | 'error';
    disabled?: boolean;
    small? : boolean;
}