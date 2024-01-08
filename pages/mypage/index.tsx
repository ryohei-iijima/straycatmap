import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import styles from './mypage.module.css'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import Image from 'next/image'
import Link from 'next/link'
import { Logout } from 'features/Logout/Logout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'features/AuthContext/AuthContext'

function Mypage() {
    const { currentUser, loading } = useAuth();
    const [profileImage, setProfileImage] = useState('/images/mypage.svg');
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState('読み込み中...');
    const router = useRouter();
    useEffect(() => {
        console.log("currentUserの情報です", currentUser);
        if (!loading && currentUser) {
            setEmail(currentUser.email)
            if (currentUser.photoURL) setProfileImage(currentUser.photoURL);
            if (currentUser.displayName) setUserName(currentUser.displayName);
        }
        if (!loading && !currentUser) {
            // 認証情報がロードされ、かつユーザーがログインしていない場合にリダイレクト
            router.push('/login?redirect=/mypage');
        }
    }, [currentUser, loading]);

return (
    <>
        <Header></Header>
        <div className={styles['profile']}>
            <div className={styles['icon']}>
                <Image 
                    src={profileImage}
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
            <p className={styles['user-name']}>{userName}</p>
            <p className={styles['email']}>{email}</p>
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
            <button className={styles['logout']} onClick={Logout}>ログアウト</button>
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