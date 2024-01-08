import React, { useState, useEffect } from 'react';
import styles from 'components/page/Login/index.module.scss';
import { useRouter } from 'next/router';
import { Firestore } from "lib/firebase/Firestore";
import { useAuth } from 'features/AuthContext/AuthContext'
import Link from 'next/link'

export const Login = () => {
    const { currentUser, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const { redirect } = router.query;
    const firestore = new Firestore();
    firestore.init();

    const handleLogin = async (e) => {
        e.preventDefault();
        await firestore.logIn(email, password)
            .then((userCredential) => {
                // ログイン成功
                const user = userCredential.user;
                console.log("ログイン成功:", user);
                router.push(redirect || '/');
            })
            .catch((error) => {
                setError("ログインできませんでした。メールアドレスとパスワードをもう一度ご確認の上ご入力お願いいたします。")
                console.error("ログイン失敗:", error);
            });
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
                <h1 className={styles['page-title']}>ログイン</h1>
                <form className={styles['form']} onSubmit={handleLogin}>
                    <label>
                        メールアドレス：
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </label>
                    <label>
                        パスワード：
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </label>
                    <button type="submit">ログイン</button>
                    {error && <p>{error}</p>}
                    <Link href='/signup' legacyBehavior>
                        <a className={styles['link']}>新規登録</a>
                    </Link>
                </form>
            </div>
        </>
    )
}
