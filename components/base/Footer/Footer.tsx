import React from 'react';
import styles from 'components/base/Footer/Footer.module.css'
import GrobalNaviGation from 'components/base/GrobalNaviGation/GrobalNaviGation';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <GrobalNaviGation></GrobalNaviGation>
        </footer>
    )
}
export default Footer;
