import React from 'react';
import styles from './RMButton.module.scss'

export default function RMButton(props: RMButtonProps){
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

    if(props.href){
        return (<a className={classes.join(' ')} href={props.href} onClick={props.onClick}>{props.children}</a>);
    }else{
        return (<button className={classes.join(' ')} onClick={props.onClick}>{props.children}</button>);
    }
}

export interface RMButtonProps{
    onClick?: () => void;
    children?: any;
    color: string;
    href?: string;
}