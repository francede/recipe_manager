import React, { ChangeEvent, useState } from 'react';
import styles from './RMInput.module.scss'

export default function RMInput(props: RMInputProps){
    const [focus, setFocus] = useState(false);

    const textInput = <input 
        onFocus={() => setFocus(true)} 
        onBlur={() => setFocus(false)}  
        placeholder={props.placeholder} 
        className={styles.input} 
        type='text' 
        value={props.value} 
        onChange={(e) => props.onChange?.(e.target.value)}/>;
    const textarea = <textarea 
        placeholder={props.placeholder} 
        className={styles.input}
        value={props.value} 
        onChange={(e) => props.onChange?.(e.target.value)}/>;
    const passwordInput = <input 
        type='password' 
        placeholder={props.placeholder} 
        className={styles.input} 
        value={props.value} 
        onChange={(e) => props.onChange?.(e.target.value)}/>;
    const numberInput = <input 
        placeholder={props.placeholder} 
        className={styles.input} 
        type='number' 
        value={props.value} 
        onChange={(e) => props.onChange?.(e.target.value)}/>;

    const getOptions = () => {
        if(props.options) {
            return (
                <div className={styles['menu-container']} style={{display: focus ? 'block' : 'none'}}>
                    {props.options?.map(o => 
                        <div key={o} onMouseDown={() => {props.onMenuClick?.(o)}}>{o}</div>
                    )}
                </div>
            );
        }
    }

    switch(props.type){
        case 'text':
            return <div className={styles['input-container']}>{textInput} {getOptions()}</div>;
        case 'textarea':
            return textarea;
        case 'password':
            return passwordInput;
        case 'number':
            return numberInput;
    }
}


export interface RMInputProps{
    onChange?: (e: string | number) => void
    onMenuClick?: (e: string | number) => void
    value?: string | number
    type: 'text' | 'textarea' | 'password' | 'number'
    placeholder?: string
    options?: string[]
}