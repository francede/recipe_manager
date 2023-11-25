import React from 'react';
import styles from './RMDivider.module.scss'

export default function RMDivider(props: RMDividerProps){
    return (
        <div className={styles['divider']}>
            <div></div>
        </div>
    );
}

export interface RMDividerProps{
    color?: string;
    margin?: string;
}