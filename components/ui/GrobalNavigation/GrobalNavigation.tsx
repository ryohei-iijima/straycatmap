import React from 'react';
import styles from 'components/ui/GrobalNavigation/GrobalNavigation.module.css';
import Image from 'next/image';

export const GrobalNavigation = () => {
    return (
        <>
            <nav className={styles['grobal-navigation']}>
                <ul className={styles['list']}>
                    <li className={styles['item']}>
                        <a href='/mypage' className={styles['link']}>
                            <Image 
                                src="/images/mypage.svg"
                                alt=""
                                width={18}
                                height={18}
                                />
                            <span>マイページ</span>
                        </a>
                    </li>
                    <li className={styles['item']}>
                        <a href='/' className={styles['link']}>
                            <Image 
                                src="/images/search.svg"
                                alt=""
                                width={18}
                                height={18}
                                />
                            <span>さがす</span>
                        </a>
                    </li>
                    <li className={styles['item']}>
                        <a href='/add' className={styles['link']}>
                            <Image 
                                src="/images/add.svg"
                                alt=""
                                width={18}
                                height={18}
                                />
                            <span>追加</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
