'use client';

import React, { useState, useEffect } from 'react';
import styles from 'components/page/Add/index.module.scss';
import { useRouter } from 'next/navigation';
import { Firestore } from "utils/firebase/firebase";
import { useAuth } from 'features/AuthContext/AuthContext';
import { User } from 'firebase/auth';
import Image from 'next/image'
import { GoogleMap } from 'features/GoogleMapComponents/GoogleMap';

export const Add = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [catImage, setCatImage] = useState<File>();
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [googleMapLat, setGoogleMapLat] = useState<number | string>('');
    const [googleMapLng, setGoogleMapLng] = useState<number | string>('');
    const router = useRouter();
    const firestore = new Firestore();
    firestore.init();
    const authContext = useAuth();

    const handleCallback = async (map: google.maps.Map) => {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const currentCatPosition = new AdvancedMarkerElement;
      
        let longPressTimeout: any;

        // 地図上のイベントリスナー
        map.addListener("mousedown", (event: { latLng: { lat: () => string | number; lng: () => string | number; }; }) => {
            // 長押し開始
            longPressTimeout = setTimeout(() => {
                const lat = event.latLng.lat() ?? '';
                const lng = event.latLng.lng() ?? '';
                setGoogleMapLat(lat);
                setGoogleMapLng(lng);
                currentCatPosition.map = map;
                if (typeof lat === 'string' || typeof lng === 'string') return;
                currentCatPosition.position = {lat, lng};          
            }, 500); // 長押し判定時間（ミリ秒）
        });

        map.addListener("mouseup", () => {
            // 長押し終了（タイマーをリセット）
            clearTimeout(longPressTimeout);
        });

        map.addListener("mouseout", () => {
            // 地図外にマウスが出た場合もタイマーをリセット
            clearTimeout(longPressTimeout);
        });
    }

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
                    <div className={styles['file']}>
                        <label className={styles['thumbnail']}>
                            <Image
                                src="/images/camera.svg"
                                alt=""
                                width={10}
                                height={10}
                            />
                            写真を登録
                            <input
                                id="catImage"
                                type="file"
                                accept="image/*"
                                onChange={handleCatImage}
                            />
                            {preview && <img className={styles['preview-image']} src={preview.toString()} alt="cat preview" />}
                        </label>
                    </div>
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
                    <input id="lat" value={googleMapLat} type="hidden" name='lat' readOnly />
                    <input id="lng" value={googleMapLng} type="hidden" name='lng' readOnly />
                    <GoogleMap addClass="--add" onMapLoad={handleCallback} />
                    <button type="submit">登録</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    )
}
