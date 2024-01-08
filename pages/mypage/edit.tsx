import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import styles from './mypage.module.css'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useAuth } from 'features/AuthContext/AuthContext'
import { useRouter } from 'next/router';
import { Firestore } from "lib/firebase/Firestore";

function Mypage() {
    const { currentUser, loading } = useAuth();
    const [profileImage, setProfileImage] = useState('/images/mypage.svg');
    const [updateImage, setUpdateImage] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState('読み込み中...');
    const [error, setError] = useState(null);
    const router = useRouter();
    const { redirect } = router.query;
    const firestore = new Firestore();
    firestore.init();

    const handleProfileImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            setProfileImage(e.target.result)
            setUpdateImage(file)
            console.log(e.target.result)
          };
          reader.readAsDataURL(file);
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await firestore.updateEmail(currentUser, email);
            await firestore.updateDisplayName(currentUser, displayName);
            await firestore.updateProfileImage(currentUser, updateImage);
            alert("正常に保存されました。");
            router.push('/mypage');
        } catch (error) {
            setError(error.message);
            console.error("会員情報の更新に失敗しました。:", error);
        }
    }

    useEffect(() => {
        console.log("currentUserの情報です", currentUser);
        if (!loading && currentUser) {
            setEmail(currentUser.email)
            if (currentUser.photoURL) setProfileImage(currentUser.photoURL);
            if (currentUser.displayName) setDisplayName(currentUser.displayName);
        }
        if (!loading && !currentUser) {
            // 認証情報がロードされ、かつユーザーがログインしていない場合にリダイレクト
            router.push('/login?redirect=/mypage');
        }
    }, [currentUser, loading]);

  return (
    <>
        <Header></Header>
        <form onSubmit={handleUpdateProfile}>
            <div className={`${styles['profile']} ${styles['edit-profile']}`}>
                <label className={styles['icon']}>
                    <Image 
                        src={profileImage}
                        alt=""
                        width={40}
                        height={40}
                    />
                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProfileImage(e)}                    
                    />
                </label>
            </div>
            <div className={styles['profile-edit']}>
                <div className={styles['inner']}>
                    <dl>
                        <div className={styles['block']}>
                            <dt>ニックネーム</dt>
                            <dd>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </dd>
                        </div>
                        <div className={styles['block']}>
                            <dt>メールアドレス</dt>
                            <dd>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </dd>
                            <dd className={styles['note']}>
                                <p>※メールアドレスは変更後に確認メールが届きますので認証作業をお願いいたします。</p>
                                <p>※メールアドレスの認証が終わり次第メールアドレスの更新は完了となります。</p>
                            </dd>
                        </div>
                    </dl>
                </div>
                <button type="submit">保存</button>
                {error && <p>{error}</p>}
            </div>
        </form> 
        <GrobalNavigation/>
        <Footer></Footer>
    </>
  )
}

export default Mypage