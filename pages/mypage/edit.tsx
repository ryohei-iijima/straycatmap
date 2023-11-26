import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import styles from './mypage.module.css'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import Image from 'next/image'

function Mypage() {
  return (
    <>
        <Header></Header>
        <div className={`${styles['profile']} ${styles['edit-profile']}`}>
            <div className={styles['icon']}>
                <Image 
                    src="/images/mypage.svg"
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
        </div>
        <div className={styles['profile-edit']}>
            <div className={styles['inner']}>
                <dl>
                    <div className={styles['block']}>
                        <dt>名前</dt>
                        <dd>
                            User Name
                            <span className={styles['image']}>
                                <Image
                                    src="/images/edit.svg"
                                    alt=""
                                    width={12}
                                    height={12}
                                />
                            </span>
                        </dd>
                    </div>
                    <div className={styles['block']}>
                        <dt>メールアドレス</dt>
                        <dd>
                            kotarouop@gmail.com
                            <span className={styles['image']}>
                                <Image
                                    src="/images/edit.svg"
                                    alt=""
                                    width={12}
                                    height={12}
                                />
                            </span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <GrobalNavigation/>
        <Footer></Footer>
    </>
  )
}

export default Mypage