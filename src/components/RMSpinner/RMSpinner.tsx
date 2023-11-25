import React from 'react';
import styles from './RMSpinner.module.scss'

export default function RMSpinner(props: RMSpinnerProps){
    var classes = [styles.button];
    switch(props.color){
        case 'primary':
            classes.push(styles['theme-primary']);
            break;
        case 'secondary':
            classes.push(styles['theme-secondary']);
            break;
        case 'error':
            classes.push(styles['theme-error']);
            break;
    }

    return <div>SPINNING</div>
}

export interface RMSpinnerProps{
    color: string;
}