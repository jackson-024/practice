import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { VectorMap } from './components/VectorMap'

export const Map = () => {
  return (
    <Container>
      <Row>
        <VectorMap/>
      </Row>
    </Container>
  )
}
