'use client';
import Navbar from "../../components/Navbar";
import './globals.css'
import Header from "../../components/Header";
import About from "../../components/About";
import Services from "../../components/Services";
import Work from "../../components/Work";
import Timeline from "../../components/Timeline";
import Certificates from "../../components/Certificates";
import Contacts from "../../components/Contacts";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import Weather from "../../components/Weather";
import Map from "../../components/Address";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificates,
  fetchProjects,
  fetchSkills,
  fetchTimeline,
} from "../store/features/portfolioSlice";

export default function Home() {
  const [isdarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.portfolio.status);

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

  useEffect(() => {
    if (status.skills === "idle") {
      dispatch(fetchSkills());
    }

    if (status.projects === "idle") {
      dispatch(fetchProjects());
    }

    if (status.certificates === "idle") {
      dispatch(fetchCertificates());
    }

    if (status.timeline === "idle") {
      dispatch(fetchTimeline());
    }
  }, [dispatch, status]);

  return (
    <>
    <Navbar isdarkMode={isdarkMode} setIsDarkMode={setIsDarkMode}/>
    <Header isdarkMode={isdarkMode}/>
    <About isdarkMode={isdarkMode}/>
    <Services isdarkMode={isdarkMode}/>
    <Work isdarkMode={isdarkMode}/>
    <Timeline isdarkMode={isdarkMode}/>
    <Certificates isdarkMode={isdarkMode}/>
    <Contacts isdarkMode={isdarkMode}/>
    <Footer isdarkMode={isdarkMode}/>
    <Weather isdarkMode={isdarkMode}/>
    <Map isdarkMode={isdarkMode}/>
    </>
  );
}
