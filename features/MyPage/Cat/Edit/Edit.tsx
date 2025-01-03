'use client';

import React, { useState, useEffect } from 'react';
import styles from 'components/page/Add/index.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { Firestore } from "utils/firebase/firebase";
import { useAuth } from 'features/AuthContext/AuthContext';
import { User } from 'firebase/auth';
import { GoogleMap } from 'features/GoogleMapComponents/GoogleMap';
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation';
import Footer from 'components/base/Footer/Footer';
import Header from 'components/base/Header/Header';

type targetCatMapInfoType = {
    catMapPath: string;
    comment: string;
    created_at: Date;
    lat: string;
    lng: string;
    title: string;
    updated_at: Date;
    users_id: string;
}

const Edit = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [catImage, setCatImage] = useState<File>();
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [googleMapLat, setGoogleMapLat] = useState<number | string>('');
    const [googleMapLng, setGoogleMapLng] = useState<number | string>('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [defaultFileName, setDefaultFileName] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const DOC_ID = searchParams.get('doc_id');
    const firestore = new Firestore();
    firestore.init();
    const authContext = useAuth();

    useEffect(() => {
        if(map === null) return;
        addmMarker();
    },[map, googleMapLat, googleMapLng]);

    const addmMarker = async () => {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const currentCatPosition = new AdvancedMarkerElement;

        let longPressTimeout: any;

        if(typeof googleMapLat === 'string' || typeof googleMapLng === 'string') return;

        currentCatPosition.map = map;
        currentCatPosition.position = {lat: googleMapLat, lng: googleMapLng};

        if(map === null) return;

        // 地図上のイベントリスナー
        map.addListener("mousedown", (event: { latLng: { lat: () => number; lng: () => number; }; }) => {
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
    };

    const handleCallback = async (resultMap: google.maps.Map) => {
        setMap(resultMap);
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
            if (DOC_ID !== null) {
                firestore.editCatData(DOC_ID).then(data => {
                    if(data === null) return;
                    console.log(data);
                    setTitle(data.title);
                    setComment(data.comment);
                    setPreview(data.filePath);
                    setDefaultFileName(data.fileName);
                    setGoogleMapLat(data.lat);
                    setGoogleMapLng(data.lng);
                });
            }
        } else if (!loading && currentUser === null) {
            router.push('/login?redirect=/mypage/cat/edit');
        }
    }, [loading, currentUser, router]);

    const handleupdateCatInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (DOC_ID === null || !catImage) return;
            await firestore.updateCatInfo(catImage, comment, title, googleMapLat, googleMapLng, DOC_ID, defaultFileName).then(() => {
                alert("編集登録されました。")
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

    const handleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (DOC_ID === null) return;
            await firestore.deleteCatInfo(DOC_ID, defaultFileName).then(() => {
                alert("削除されました。")
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("のらねこの削除に失敗しました。:", error);
            } else {
                console.error("未知のエラータイプ:", error);
            }
        }
    }

    return (
        <>
            <Header></Header>
            <div className={styles['wrap']}>
                <h1 className={styles['page-title']}>のらねこ編集画面</h1>
                <form className={styles['form']} onSubmit={handleupdateCatInfo}>
                    <div className={styles['file']}>
                        <label className={styles['thumbnail']}>
                            {
                                preview ? 
                                <img className={styles['preview-image']} src={preview.toString()} alt="cat preview" /> :
                                <span>読み込み中...</span>
                            }
                            <input
                                id="catImage"
                                type="file"
                                accept="image/*"
                                onChange={handleCatImage}
                            />
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
                    <button type="submit">編集内容を登録</button>
                    <button className={styles['delete']} type="button" onClick={handleDelete}>投稿内容を削除</button>
                </form>
                {error && <p>{error}</p>}
            </div>
            <GrobalNavigation/>
            <Footer></Footer>
        </>
    )
}

export default Edit;