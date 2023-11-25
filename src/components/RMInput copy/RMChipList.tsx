import RMIcon from '../RMIcon/RMIcon';
import styles from './RMChipList.module.scss'

export default function RMChipList(props: RMChipListProps){
    const handleCloseClick = (valToDelete: string) => {
        props.onDelete(valToDelete);
    }

    return (
        <div className={styles['chip-list']}>
            {props.value?.map((val, index) => {
                return (
                    <div className={styles['chip']} key={index}>
                        <span>{val}</span> 
                        <button className={styles['close-button']} onClick={() => {handleCloseClick(val)}}><RMIcon fontSize='18px'>close</RMIcon></button>
                    </div>
                );
            })}
        </div>
    );
}


export interface RMChipListProps{
    onDelete: (e: string) => void
    value: string[]
}