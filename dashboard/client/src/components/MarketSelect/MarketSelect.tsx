import { Col, Row, Container, Button } from 'react-bootstrap';
import {Market} from '../../utils/types'

const MarketSelect = ({ market }: { market: Market }) => { 
    console.log(market)
    return (
        <Row key={market.id}>
            <Col>
                <Button variant='primary'>{market.name}</Button>
            </Col>
        </Row>
    )
}

export default MarketSelect;