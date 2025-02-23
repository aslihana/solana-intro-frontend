import * as web3 from '@solana/web3.js'
import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  /* Add another call to useState that let’s you set the 
  executable property value from 
  the account info and display it in the UI
  */ 
  const [isExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = (address: string) => {
    try {
    
      setAddress(address)
      const key = new web3.PublicKey(address);
      //setAddress(key.toBase58())
  
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
  
      connection.getBalance(key).then(balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })

      /* Use the method 
      getAccountInfo to get a 
      JSON object with information about the account
      */
      connection.getAccountInfo(key).then(info => {
        /* Check its properties to find out if its executable
        */
        setIsExecutable(info?.executable ?? false);
      })
    }
      catch(error) {
        setAddress('')
        setBalance(0)
        alert(error)
      }
  
  }



  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${isExecutable ? 'Yes' : 'No'}`}</p>
      </header>
    </div>
  )
}

export default Home
