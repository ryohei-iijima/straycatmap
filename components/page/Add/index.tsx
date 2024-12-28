'use client';

import React, { useState, useEffect } from 'react';
import styles from 'components/page/Add/index.module.scss';
import { useRouter } from 'next/navigation';
import { Firestore } from "utils/firebase/firebase";
import { useAuth } from 'features/AuthContext/AuthContext';
import { User } from 'firebase/auth';
import Image from 'next/image'
import { GoogleMapComponents } from 'features/GoogleMapComponents/GoogleMapComponents';
import { useGoogleMap } from 'features/GoogleMapComponents/GoogleMapContext';

export const Add = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [catImage, setCatImage] = useState<File>();
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [googleMapLat, setGoogleMapLat] = useState<number | null>(null);
    const [googleMapLng, setGoogleMapLng] = useState<number | null>(null);
    const router = useRouter();
    const firestore = new Firestore();
    firestore.init();
    const authContext = useAuth();
    const googleMapContext = useGoogleMap();

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
        } else if (!loading && currentUser === null) {
            router.push('/login?redirect=/add');
        }
    }, [loading, currentUser, router]);


    useEffect(() => {
        if (googleMapContext) {
            const { lat, lng } = googleMapContext;
            if (lat !== null && lng !== null) {
                setGoogleMapLat(lat);
                setGoogleMapLng(lng);
            }
        }
    }, [googleMapContext]);


    const handleRegistrationCatInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!currentUser || !catImage) return;
            await firestore.postCatInfo(currentUser, catImage, comment, title, googleMapLat, googleMapLng).then(() => {
                alert("登録されました。")
                // router.push('/add/completion');
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("のらねこの登録に失敗しました。:", error);
            } else {
                console.error("未知のエラータイプ:", error);
            }
        }
    }

    const handleCatImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            setCatImage(e.target.files[0])
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <>
            <div className={styles['wrap']}>
                <h1 className={styles['page-title']}>のらねこ登録画面</h1>
                <form className={styles['form']} onSubmit={handleRegistrationCatInfo}>
                    <label>
                        <label htmlFor="catImage" className={styles['file']}>
                            <Image
                                src="/images/camera.svg"
                                alt=""
                                width={10}
                                height={10}
                            />
                            写真を登録
                        </label>
                        <input
                            id="catImage"
                            type="file"
                            accept="image/*"
                            onChange={handleCatImage}
                        />
                        {preview && <img className={styles['preview-image']} src={preview.toString()} alt="cat preview" />}
                    </label>
                    <label>
                        <p>タイトル</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>コメント</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <input id="lat" value={googleMapLat ?? undefined} type="hidden" name='lat' readOnly />
                    <input id="lng" value={googleMapLng ?? undefined} type="hidden" name='lng' readOnly />
                    <GoogleMapComponents addClass="--add" />
                    <button type="submit">登録</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    )
}
