import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Button, TextField} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useState } from 'react';
import Settings from '@/components/Settings';
import AddDevice from '@/components/AddDevice';
import DeviceList from '@/components/DeviceList';
import MyNavbar from "@/components/MyNavbar";
import RoomList from '@/components/RoomList';
const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState("default");

  return (
    <>
      <Head>
        <title>EcoDom</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <MyNavbar setCurrentTab={setCurrentTab}></MyNavbar>
      <main className={styles.main}>
        {currentTab == "addDevice" && (
            <AddDevice/>
        )}
        {currentTab == "deviceList" && (
            <DeviceList/>
        )}
        {currentTab == "roomList" && (
            <RoomList/>
        )}
        {currentTab == "settings" && (
            <Settings/>
        )}

        
        
      </main>
    </>
  )
}
