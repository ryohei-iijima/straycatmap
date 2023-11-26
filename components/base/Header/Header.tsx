import React from 'react';
import styles from 'components/base/Header/Header.module.css'

const Header = (props:any) => {
    return (
        <header className={styles['header']}>
            <h1 className={styles['title']}>のらねこマップ</h1>
        </header>
    )
}
export default Header;
