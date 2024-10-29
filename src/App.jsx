import { useState } from 'react'
import './App.css'
import RouterConfig from './config/RouterConfig'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import Footer from './components/Footer'
function App() {

  return (
    <>

      <Header />
      <PageContainer>
        <RouterConfig />

      </PageContainer>
      <Footer />
    </>
  )
}

export default App
