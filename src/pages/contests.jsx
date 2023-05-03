import CCard from '@/components/contests/CCard'
import { getContest } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'

function contests() {
    const [data, setData] = useState([])
    useEffect(() => {
        getContest().then((res) => {
            setData(res.data)
        }
        )
    }, [])
    useEffect(() => {
        setFilterData(data)
    }, [data])
    const [filterdata, setFilterData] = useState(data)
    const handleChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === '') {
            setFilterData(data)
        }
        else {
            setFilterData(data.filter((contest) => contest.site === e.target.value))
        }
    }

    return (
        <Container>
            <h1 className='text-center my-5'>Competations you can't miss!</h1>
            <Form.Select aria-label="Default select example" onChange={handleChange}>
                <option value="">All</option>
                <option value="HackerRank">HackerRank</option>
                <option value="HackerEarth">HackerEarth</option>
                <option value="AtCoder">AtCoder</option>
                <option value="CodeChef">CodeChef</option>
                <option value="CodeForces">CodeForces</option>
                <option value="LeetCode">LeetCode</option>
                <option value="Kick Start">KickStart</option>
            </Form.Select>
            <div className='row'>
                {filterdata?.map((contest, key) => (
                    <div className='col-md-3 my-4' key={key}>
                        <CCard data={contest} />
                    </div>
                ))}
            </div >
        </Container >
    )
}

export default contests