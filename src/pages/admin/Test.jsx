import React from 'react'
import { useState,useEffect } from 'react'


export const Coundown = () => {
    const [second,setSecond] = useState(0);
    const [minute,setMinute] = useState(3);
    const [start,setStart] = useState(false);

    const [update,setUpdate] = useState(0)

    const date = new Date()
    const currentMinute = date.getMinutes()
    const currentSecond = date.getSeconds()
    
    
    const dulieunhap = new Date("2023-04-06T18:09:00.164Z")
   
    

    useEffect(() => {
      
      let curTime_second = Math.floor(180-(date - dulieunhap)/1000);

      let myTimeout 
      if(currentMinute === dulieunhap.getMinutes() && currentSecond === dulieunhap.getSeconds()){
        setStart(true);
        setSecond(second-1);
        return()=>{
          clearTimeout(myTimeout)
        }
      }else if(curTime_second < 180 && curTime_second >= 0 ){
       
        setSecond(curTime_second % 60);
        setMinute((curTime_second-(curTime_second%60))/60); 
        setStart(true);
        return()=>{
          clearTimeout(myTimeout)
        }
      }
      else {
        //cập nhật thời gian hiện tại 0.5s/lần
        myTimeout =setTimeout(()=>{
          setUpdate(update + 1)
        },500); 
      }
    },[update])

    
    useEffect(()=>{
      let curTime_second = Math.floor(180-(date - dulieunhap)/1000);
      let myTimeout = 0
        if(start) {
            if(second < 0){
              setSecond(59);
              setMinute(minute-1);
            }
            if(curTime_second > 180 || curTime_second <= 0){
                setStart(false);
                setMinute(3)
                setSecond(0);
               
                return () => {
                  clearTimeout(myTimeout)
              }
            }
            if(curTime_second===0){
              
            }
            
             myTimeout =setTimeout(()=>{
                setSecond(second-1);
            },1000);  
        }  
        return () => {
            clearTimeout(myTimeout)
        }
    },[second,start])

  return (
    <div>
      <div className='Countdown'>
          <h1>0{minute} : {second<10 ? '0': ''}{second}</h1>
      </div>
      <h3>
        {start ? 'RUNNING' : 'Loading data...'}
      </h3>
    </div>
  )
}