import React from 'react';
import styles from 'components/ui/Modal/Modal.module.css';

export const Modal = (props:any) => {
    const modalClass = props.isModal ? `${styles["open"]} ${styles['modal']}` : styles['modal'];
    return (
        <div className={modalClass}>
        <div className={styles['modal-overlay']} onClick={props.modalClose}></div>
        <div className={styles['modal-content']}>
          <img src={props.selectCatInfo.image} alt="" />
          <h2>{props.selectCatInfo.title}</h2>
          <p>{props.selectCatInfo.describe}</p>
          <button className={styles['modal-close']} onClick={props.modalClose}>× 閉じる</button>
        </div>
      </div>  
    );
}