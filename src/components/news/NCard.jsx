import React from 'react'
import { Card } from 'react-bootstrap'

function NCard({ data }) {
    console.log("data", data)
    return (
        <Card style={{ width: '18rem', minHeight: '20rem', textAlign: "center", alignItems: "center", padding: "15px 0 5px 0", boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;" }}>
            {/* <Card.Img variant="top" src={data.urlToImage} style={{
                width: '35%',
            }} /> */}
            <Card.Img variant="top" src={data.urlToImage} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <a href={data.url} target="_blank">{data.source.name}</a>
                <p>

                </p>
            </Card.Body>
        </Card>
    )
}

export default NCard