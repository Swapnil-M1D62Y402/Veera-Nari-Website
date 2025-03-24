import React from 'react'
import AboutComponent from '@/components/aboutus'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const about_page = () => {
  return (
    <div className='bg-background'>
      <Navbar />
      <AboutComponent />
      <Footer/>
    </div>
  )
}

export default about_page
