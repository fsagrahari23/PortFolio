'use client';
import Image from "next/image";
import Navbar from "../../components/Navbar";
import './globals.css'
import Header from "../../components/Header";
import About from "../../components/About";
import Services from "../../components/Services";
import Work from "../../components/Work";
import Contacts from "../../components/Contacts";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import Weather from "../../components/Weather";
import Map from "../../components/Address";

export default function Home() {
  const [isdarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if((localStorage.getItem('theme') === 'dark')|| (!('theme' in localStorage)) || (window.matchMedia('(prefers-color-scheme: dark)').matches)){
      setIsDarkMode(true);
    }
    else{
      setIsDarkMode(false);
    }
    
  },[])
  useEffect(() => {
    if(isdarkMode){
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }else{
      document.documentElement.classList.remove('dark');
      localStorage.clear('theme');
    }
  },[isdarkMode]);
  return (
    <>
    <Navbar isdarkMode={isdarkMode} setIsDarkMode={setIsDarkMode}/>
    <Header isdarkMode={isdarkMode}/>
    <About isdarkMode={isdarkMode}/>
    <Services isdarkMode={isdarkMode}/>
    <Work isdarkMode={isdarkMode}/>
    <Contacts isdarkMode={isdarkMode}/>
    <Footer isdarkMode={isdarkMode}/>
    <Weather isdarkMode={isdarkMode}/>
    <Map isdarkMode={isdarkMode}/>
    </>
  );
}
