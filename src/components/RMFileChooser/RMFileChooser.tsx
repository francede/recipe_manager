import RMIconButton from '../RMIconButton/RMIconButton';
import { RMTooltipProps } from '../RMTooltip/RMTooltip';
import styles from './RMFileChooser.module.scss'

export default function RMFileChooser(props: RMFileChooserProps){

    return (
        <div className={props.className}>
            <label htmlFor='input' className={styles.label}>
                <div className={styles.container}>
                    <RMIconButton color='secondary' isLink tooltipOptions={props.tooltipOptions}>{props.icon}</RMIconButton>
                </div>
            </label>
            <input type='file' id='input' className={styles.input} onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                    const i = event.target.files[0];
              
                    props.onChange(i);
                  }
            }}></input>
        </div>
    );
}

export interface RMFileChooserProps{
    onChange: (file: File) => void;
    className?: string;
    icon: string;
    tooltipOptions?: RMTooltipProps;
}