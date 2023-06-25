import Link from 'next/link'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bg from '../public/bg1.webp'
import logo from '../public/sportsgenph_Text_vector.png'
import logo2 from '../public/footer_Text_vector.png'
import { LoginDetails } from '../components/LoginDetails.js'




const LOGO = () => (
    
  <Image
    src={logo} 
    alt="SportsGenPh logo"
    sizes="(height: 13rem)"
    priority
  />

)

const LOGO2 = () => (
    
  <Image  
  src={logo2} 
  alt="SportsGenPh logo" 
  sizes="(height: 1rem,
          width: 5rem
    )" 
  />

)

export default function Home() {
 
  return (
    <>
    
      <div className={styles.canvass}
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <Head>
          <title>SportsGenPH</title>
          <meta name="sportsgenph_homepage" content="SportsGenPH" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
        {/* <LoginDetails /> */}
          <div className={styles.title}>
            <span className={styles.customlogo}>
              <LOGO />
              {/* <Image  src={logo}  alt="SportsGenPh logo" priority='true'/> */}
            </span>
          </div>

          <p className={styles.description}>
            {/* Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code> */}
          </p>

          <div className={styles.homepagegrid}>
            <Link href="/event" className={styles.card}>
              <h2>Events &rarr;</h2>
              <p>Check real-time Events!</p>
            </Link>

            <Link href="#" className={styles.card}>
              <h2>Ranking &rarr;</h2>
              <p>Regional Rankings!</p>
            </Link>

            <Link
              href="/signup"
              className={styles.card}
            >
              <h2>Create an account&rarr;</h2>
              <p>Register your club!</p>
            </Link>

            <Link
              href="/event/create"
              className={styles.card}
            >
              <h2>Manage an Event &rarr;</h2>
              <p>
                Create Tournaments!
              </p>
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by:{'  '}
            <span className={styles.footerlogo}>
              <LOGO2 />
            </span>
          </Link>
        </footer>
      </div>
    </>

  )
}


