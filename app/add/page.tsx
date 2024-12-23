import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import React from 'react'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import { Add } from "components/page/Add"
import { GoogleMapProvider } from 'features/GoogleMapComponents/GoogleMapContext'

function add() {
  return (
    <>
        <Header></Header>
        <GoogleMapProvider>
          <Add></Add>
        </GoogleMapProvider>
        <GrobalNavigation/>
        <Footer></Footer>
    </>
  )
}

export default add