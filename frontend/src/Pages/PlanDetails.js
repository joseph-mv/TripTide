import React from 'react'
import Header from '../Components/Header/Header'
import Journey from '../Components/Journey/Journey'
import SuggestedLocations from '../Components/SuggestedLocations/SuggestedLocations'
import Map from '../Components/Map/Map'

function PlanDetails() {
  return (
    <div>
        <Header/>
      
        <Journey/>
        <SuggestedLocations/>
        <Map/>
        
    </div>
  )
}

export default PlanDetails
