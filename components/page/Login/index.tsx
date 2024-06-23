'use client';

import React, { useState, useEffect } from 'react';
import styles from 'components/page/Login/index.module.scss';
import { useSearchParams } from 'next/navigation';
import { Firestore } from "utils/firebase/firebase";
import { useAuth } from 'features/AuthContext/AuthContext';
import Link from 'next/link';
import { User } from 'firebase/auth';

export const Login = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useSearchParams();
    const redirect = router.get('redirect');
    const firestore = new Firestore();
    firestore.init();
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
            if (typeof redirect === "string") {
                location.href = redirect;
            } else {
                location.href = '/';
            }
        }
    }, [loading, currentUser, router, redirect]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await firestore.logIn(email, password)
            .then(() => {
                if (typeof redirect === "string") {
                    location.href = redirect;
                } else {
                    location.href = '/';
                }
            })
            .catch((error) => {
                setError("ログインできませんでした。メールアドレスとパスワードをもう一度ご確認の上ご入力お願いいたします。")
                console.error("ログイン失敗:", error);
            });
    }
  
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
