'use client';

import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import styles from './mypage.module.css'
import React, { FC } from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import Image from 'next/image'
import Link from 'next/link'
import { Logout } from 'features/Logout/Logout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'features/AuthContext/AuthContext';
import { User } from 'firebase/auth';
import getPostCats from 'features/CatMap/api/getPostCats';
import { DocumentData } from 'firebase/firestore';

const MyPage: FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState('/images/mypage.svg');
    const [userName, setUserName] = useState('読み込み中...');
    const [email, setEmail] = useState('読み込み中...');
    const [postCats, setPostCats] = useState<DocumentData[] | []>([]);
    const router = useRouter();
    const authContext = useAuth();

    useEffect(() => {
        if (authContext) {
            const { currentUser, loading } = authContext;
            setCurrentUser(currentUser);
            setLoading(loading);
        }
    }, [authContext]);
    
    useEffect(() => {
        if (!loading && currentUser) {
            console.log("currentUserの情報です", currentUser);
            console.log("user_id", currentUser.uid);
            getPostCats(currentUser.uid).then((result) => {
                setPostCats(result);
            });
            if (currentUser.email) setEmail(currentUser.email);
            if (currentUser.photoURL) setProfileImage(currentUser.photoURL);
            if (currentUser.displayName) setUserName(currentUser.displayName);
        } else if (!loading && currentUser === null) {
            router.push('/login?redirect=/mypage');
        }
    }, [loading, currentUser, router]);

    return <>
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
                {
                    postCats.length === 0 ?
                    (<p>登録されている猫はいません</p>) :
                    (<ul className={styles['list']}>
                        {
                            postCats.map((postCat, index) => (
                            <li className={styles['item']} key={index}>
                                <Image
                                    src={postCat.catMapPath}
                                    alt={postCat.title}
                                    fill
                                    className={styles["image"]}
                                />
                            </li>
                            ))
                        }
                    </ul>)
                }
            </div>
        </div>
        <GrobalNavigation/>
        <Footer></Footer>
    </>
};

export default MyPage;