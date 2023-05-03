import authContext from '@/hooks/AuthContext/authContext';
import { getUserAvatar } from '@/utils';
import Image from 'next/image';
import Link from 'next/link'
import React, { useContext } from 'react'
import styles from "../../styles/PageNavbar.module.css"

const PageNavbar = () => {
    const { user, logout } = useContext(authContext);
    const handleLogout = () => {
        logout();
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.subnav}>
                <Link href="/" passHref>
                    <h2>StudyBuddy</h2>
                </Link>
                <div className={styles.login}>
                    {!user && (
                        <Link href="/sign-in" passHref>
                            <button className={styles.login_button}>SignIn</button>
                        </Link>
                    )}
                    {user && <Image
                        src={getUserAvatar(user?.user_name, 30)}
                        className="user-avatar rounded-circle mx-1"
                        width={30}
                        height={30}
                        title={user?.user_name}
                        style={{ cursor: 'pointer' }}
                    />}
                    {/* {user && (
                        user?.user_name)} */}
                    {user && (

                        <button onClick={handleLogout} className={styles.login_button}>Logout</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PageNavbar