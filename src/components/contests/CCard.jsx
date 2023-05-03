import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Moment from 'react-moment';

function CCard({ data }) {
    console.log(data)
    return (
        <Card style={{ width: '18rem', minHeight: '20rem', textAlign: "center", alignItems: "center", padding: "15px 0 5px 0" }}>
            <Card.Img variant="top" src={`/assets/images/${data.site}_logo.png`} style={{
                width: '35%',
            }} />
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <a href={data.url} target="_blank">{data.site}</a>
                <p>
                    <Moment date={data.start_time} format="D-MMM-YY hh:mm" withTitle /> to<br /> <Moment date={data.end_time} format="D-MMM-YY hh:mm" withTitle />
                </p>
            </Card.Body>
        </Card>
    )
}

export default CCard