import React, { useState, useEffect } from 'react';
import styles from 'components/page/Signup/index.module.scss';
import { useRouter } from 'next/router';
import { Firestore } from "lib/firebase/Firestore";
import { useAuth } from 'features/AuthContext/AuthContext'


export const Signup = () => {
    const { currentUser, loading } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const { redirect } = router.query;
    const firestore = new Firestore();
    firestore.init();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await firestore.createUser(email, password, displayName, profileImage);
            await router.push(redirect || '/');
        } catch (error) {
            setError(error.message)
            console.error("新規会員登録に失敗しました。:", error);
        }
    }

    const handleProfileImage = async (e) => {
        e.preventDefault();
        console.log(e.target.files[0].name.split('.').pop());
        setProfileImage(e.target.files[0])
    }

    useEffect(() => {
        if (!loading && currentUser) {
            console.log(currentUser);
            router.push(redirect || '/');
        }
    }, [loading, currentUser])

    return (
        <>
            <div className={styles['wrap']}>
                <h1 className={styles['page-title']}>新規会員登録</h1>
                <form className={styles['form']} onSubmit={handleSignup}>
                    <label>
                        <p>メールアドレス<span className={styles['required']}>*</span></p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </label>
                    <label>
                        <p>パスワード<span className={styles['required']}>*</span></p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </label>
                    <label>
                        <p>ニックネーム</p>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="ニックネーム"
                        />
                    </label>
                    <label>
                        <p>プロフィール画像</p>
                        <label htmlFor="profileImage" className={styles['file']}>ファイルを選択</label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImage}
                        />
                    </label>
                    <button type="submit">登録</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    )
}
