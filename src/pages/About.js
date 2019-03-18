import React from 'react'
import AboutContainer from '../components/AboutContainer'
import AboutHeader from '../components/AboutHeader'
import AboutHeader2 from '../components/AboutHeader2'
import AboutBody from '../components/AboutBody'
import BodyLink from '../components/BodyLink'
import { Link } from 'react-router-dom'

export default () => (
  <AboutContainer>
    <AboutHeader>About the IPAT(D) tool</AboutHeader>
    <AboutHeader2>Disclaimer</AboutHeader2>
    <AboutBody>The IPAT(D) is meant to give an illustrative visualization of the impact from population, affluence and technological development on 
      climate and Ecological Footprint.</AboutBody>
    <AboutBody>The model contains a simplified representation of the energy system and of the drivers causing demand for 
      food and energy.</AboutBody>
    <AboutBody>The IPAT(D) should not be used for policy planning as the aggregated nature of the model potentially can leave out important 
      information and relations. What IPAT(D) can be used for, is to highlight that we cannot solve the global environmental problems without looking 
      at population and economic development.</AboutBody>
    <AboutHeader2>Development</AboutHeader2>
    <AboutBody>The tool has been developed at <BodyLink href='http://www.sys.man.dtu.dk/'>System Analysis at the Department of Management Engineering at the Technical University of Denmark</BodyLink>.</AboutBody>
    <AboutBody>The inspiration for this tool is a chapter by Jørgen Nørgård in a recent book "Rethinking Climate and the Energy Policies".</AboutBody>
    <AboutBody>The equation I=P*A*T which combines population (P), affluence (A) and technological eco-intensity factor (T), has  been known since  Ehrlich and Holdren presented it in 1971. This equation aims to show that reducing climate change by means of only reducing T may be incredibly difficult if no measures are taken in the other two factors, i.e. P and A.</AboutBody>
    <AboutBody>In our version we have extrated diet (D) as a seperate impact and therefore the equation I=PAT(D). The ecological impact is represented by CO2 emissions and the global concentration level is translated into mean global temperature increase until 2100. The impacts are tracked on 16 different regions of the world and equality within population growth and affluence can therefore be investigated.</AboutBody>
    <AboutBody>The ecological footprint is also tracked based on data from  www.footprintnetwork.org and illustrates how much area is needed to maintain a sustainable production of food and energy to  cover the global demand. The result is how many earths are needed with a given level of consumption.</AboutBody>
    <AboutBody>Acknowledgement: We would like to thank the GLOBAL FOOTPRINT NETWORK for providing us with data that made the estimation of the footprint possible. “© Global Footprint Network 2016.  National Footprint Accounts, 2016 Edition.  Licensed and provided solely for informational  purposes.  Contact Global Footprint Network at www.footprintnetwork.org to obtain more information.”</AboutBody>
    <AboutBody>Read more and download an Excel version of the tool at the <BodyLink href='http://www.esymodels.man.dtu.dk/ipat'>IPAT-D website at DTU</BodyLink>.</AboutBody>
    <AboutBody>The online version of the tool is being developed by the software company <BodyLink href='http://www.tokni.com'>Tokni</BodyLink>.</AboutBody>
    <AboutBody><Link to='/'>Back to the main page</Link></AboutBody>
  </AboutContainer>
)