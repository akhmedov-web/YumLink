import React from 'react';
import Home from './Home';
import {Routes, Route, useLocation} from "react-router-dom";
import Cuisine from './Cuisine';
import Searched from './Searched';
import Details from './Details';
import { AnimatePresence } from 'framer-motion';

export default function Pages() {
  const location=useLocation();
  return (
    <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home/>}/>
          <Route path='/cuisine/:type' element={<Cuisine/>}/>
          <Route path='/searched/:search' element={<Searched/>}/>
          <Route path='/details/:id' element={<Details/>}/>
        </Routes>
    </AnimatePresence>
  )
}
