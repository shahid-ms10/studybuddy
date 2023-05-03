import NCard from '@/components/news/NCard'
import { getNews } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'

function News() {
    const [data, setData] = useState([])
    useEffect(() => {
        getNews().then(res => {
            console.log(res.data)
            setData(res.data.articles);
        }
        )
    }, [])
    const handleChange = (e) => {
        console.log(e.target.value)
        getNews(e.target.value).then(res => {
            console.log(res.data)
            setData(res.data.articles);
        }
        )
    }
    return (
        <Container>
            <h1 className='text-center my-5'>Always Stays updated with current affairs!</h1>
            <Form.Select aria-label="Default select example" onChange={handleChange}>
                <option value="">All</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </Form.Select>
            <div className="row">
                {data?.map((news, key) => (
                    <div className='col-md-3 my-4' key={key}>
                        <NCard data={news} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default News