import RCard from '@/components/recommendation/RCard';
import authContext from '@/hooks/AuthContext/authContext';
import dataContext from '@/hooks/DataContext/dataContext';
import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/Rcard.module.css"
// import spinner from fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


function Recommendations() {
    const { user } = useContext(authContext);
    const { recommendations, getRecommendations } = useContext(dataContext);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        try {
            setLoading(true);
            await getRecommendations(!user ? {
                user_id:user.user_id
            } : user);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    if (!loading)
        return (
            <div className={styles.recc}>

                <div className={styles.data}>
                    {recommendations?.map((recommendation, key) =>
                        <RCard data={recommendation} />)}
                </div>
            </div>
        )
    else
        return (
            <div className='text-center d-flex flex-column justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
                <FontAwesomeIcon icon={faSpinner} style={{ width: "10%", height: "5%", color: "purple" }} className={`${styles.rotate}`} />
            </div>
        )
}

export default Recommendations