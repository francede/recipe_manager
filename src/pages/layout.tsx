import RMIconButton from '@/components/RMIconButton/RMIconButton';
import { PocketBaseService } from '@/services/pocketbase/pocketbaseService';
import AuthService from '@/services/pocketbase/authService';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './layout.module.scss'

export const metadata = {
  title: 'Recipe Manager',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUserLoggedIn(PocketBaseService.pb.authStore.isValid);
  })

  const getLinkClass = (href: string) => {
    if(href === router.pathname){
        return [styles['nav-button'], styles['active']].join(" ");
    }else{
        return styles['nav-button'];
    }
  }

  const logout = () => {
    AuthService.logout().then(stuff => {
      console.log(stuff);
      router.reload();
    })
  }

  return (
    <>
      <div className={styles['navbar']}>
            <div className={styles['navbar-left']}>
                <Link className={getLinkClass('/recipes')} href='/recipes'>Recipes</Link>
                <Link className={getLinkClass('/collections')} href='/'>Collections</Link>
                <Link className={getLinkClass('/otherstuff')} href='/'>Other Stuff</Link>
            </div>
            <div className={styles['navbar-center']}>
                <Link href='/'><img className={styles['logo']} src='/logo-400x400.png'></img></Link>
            </div>
            <div className={styles['navbar-right']}>
                <div className={styles['dropdown']}>
                    <RMIconButton color="secondary">person</RMIconButton>
                    <div className={styles['dropdown-content']}>
                        {
                          userLoggedIn ? (
                            <>
                            <span>Logged in as {AuthService.getUser()?.username}</span>
                            <button onClick={logout}>Log out</button>
                            </>
                          ) : (
                            <>
                            <Link href='/login'>Log in</Link>
                            </>
                          )
                        }
                    </div>
                </div>
            </div>
        </div>
      <div style={{margin: '40px 60px'}}>{children}</div>
    </>
  )
}
