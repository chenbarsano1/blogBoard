import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'

const LandingPage = () => {
  return (
    <div className=" w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col flex-grow">
      {/* <Header /> */}
      <Hero />
    </div>
  )
}

export default LandingPage
