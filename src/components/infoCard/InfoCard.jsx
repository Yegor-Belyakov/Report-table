import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardImg } from "react-bootstrap";

function InfoCard({currentFruit, setShowInfoModal}) {
  return (
    <>
    <Card style={{ width: "18rem" }}>
      <CardImg src="https://picsum.photos/400/200" />
      <Card.Body>
        <Card.Title>{currentFruit.caption} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {currentFruit.dataType}
        </Card.Subtitle>
        <Card.Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Adipisci, blanditiis? {currentFruit.alignment}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => setShowInfoModal(false)}
        >
          Close info
        </Button>
      </Card.Body>
    </Card>
  </>
  )
}

export default InfoCard