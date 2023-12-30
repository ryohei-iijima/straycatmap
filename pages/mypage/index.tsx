import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import styles from './mypage.module.css'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import Image from 'next/image'
import Link from 'next/link'

function Mypage() {
  return (
    <>
        <Header></Header>
        <div className={styles['profile']}>
            <div className={styles['icon']}>
                <Image 
                    src="/images/mypage.svg"
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
            <p className={styles['user-name']}>User Name</p>
            <p className={styles['email']}>kotarouop@gmail.com</p>
            <Link href="/mypage/edit" legacyBehavior>
                <a className={styles['edit']}>
                    <Image
                    src="/images/edit.svg"
                    alt=""
                    width={10}
                    height={10}
                    />
                    プロフィールの編集
                </a>
            </Link>
        </div>
        <div className={styles['post-cats']}>
            <div className={styles['inner']}>
                <p className={styles['title']}>投稿したねこ</p>
                <ul className={styles['list']}>
                    <li className={styles['item']}>
                        <Image
                            src="/images/sample1.jpeg"
                            alt=""
                            fill
                            className={styles["image"]}
                        />
                    </li>
                    <li className={styles['item']}>
                        <Image
                            src="/images/sample2.jpeg"
                            alt=""
                            fill
                            className={styles["image"]}
                        />
                    </li>
                    <li className={styles['item']}>
                        <Image
                            src="/images/sample3.avif"
                            alt=""
                            fill
                            className={styles["image"]}
                        />
                    </li>
                    <li className={styles['item']}>
                        <Image
                            src="/images/sample2.jpeg"
                            alt=""
                            fill
                            className={styles["image"]}
                        />
                    </li>
                    <li className={styles['item']}>
                        <Image
                            src="/images/sample3.avif"
                            alt=""
                            fill
                            className={styles["image"]}
                        />
                    </li>
                </ul>
            </div>
        </div>
        <GrobalNavigation/>
        <Footer></Footer>
    </>
  )
}

export default Mypage