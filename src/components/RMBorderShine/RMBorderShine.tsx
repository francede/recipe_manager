import React from 'react';
import styles from './RMBorderShine.module.scss'

export default function RMBorderShine(props: RMBorderShineProps){
    const bgColor = {backgroundColor: props.backgroundColor}
    const color = { "--shine-color": props.shineColor, "--shine-width": props.shineWidth + 'deg' } as React.CSSProperties;

    return (
        <div className={styles['border-bg']} style={bgColor}>
            <div className={styles['border-shine']} style={color}>
                <div className={styles['inner']} style={bgColor}>{props.children}</div>
            </div>
        </div>
    );
}

export interface RMBorderShineProps{
    backgroundColor: string;
    shineColor: string;
    shineWidth: number;
    children?: any;
}