import React from 'react';
import styles from 'components/base/Header/Header.module.css'

const Header = (props) => {
    return (
        <header className={styles['header']}>
            <h1 className={styles['title']}>野良猫マップ</h1>
            <button onClick={props.addCatMapModalOpen}>猫追加！</button>
        </header>
    )
}
export default Header;
