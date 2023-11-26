import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'

function Mypage() {
  return (
    <>
        <Header></Header>
        <p>hogeohoge</p>
        <GrobalNavigation/>
        <Footer></Footer>
        ここは詳細ページ
    </>
  )
}

export default Mypage