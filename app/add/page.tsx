import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import { Add } from "components/page/Add"

function add() {
  return (
    <>
        <Header></Header>
        <Add></Add>
        <GrobalNavigation/>
        <Footer></Footer>
    </>
  )
}

export default add