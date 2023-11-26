import React from 'react';
import styles from 'components/ui/GrobalNavigation/GrobalNavigation.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const GrobalNavigation = () => {
    return (
        <>
            <nav className={styles['grobal-navigation']}>
                <ul className={styles['list']}>
                    <li className={styles['item']}>
                        <Link href='/mypage'>
                            <a className={styles['link']}>
                                <Image 
                                    src="/images/mypage.svg"
                                    alt=""
                                    width={18}
                                    height={18}
                                    />
                                <span>マイページ</span>
                            </a>
                        </Link>
                    </li>
                    <li className={styles['item']}>
                        <Link href='/'>
                            <a className={styles['link']}>
                                <Image 
                                    src="/images/search.svg"
                                    alt=""
                                    width={18}
                                    height={18}
                                    />
                                <span>さがす</span>
                            </a>
                        </Link>
                    </li>
                    <li className={styles['item']}>
                        <Link href='/add'>
                            <a className={styles['link']}>
                                <Image 
                                    src="/images/add.svg"
                                    alt=""
                                    width={18}
                                    height={18}
                                    />
                                <span>追加</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
