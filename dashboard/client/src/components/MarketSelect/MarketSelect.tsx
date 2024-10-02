import { Col, Row, Container, Button } from 'react-bootstrap';
import { Market } from '../../utils/types'
import { buttonThemes } from '../../styles/styles'

//this will come from state
const themes: ['themeRed', 'themeBlue'] = ['themeRed', 'themeBlue'];

const MarketSelect = ({ market }: { market: Market }) => { 
    const { id, name } = market;

    //this will come from state
    const theme = buttonThemes[themes[id - 1]];
    //that will come from state

    const handleClick = () => { 
        console.log(`Market ${name} was clicked`);
    }
    return (
        <Row>
            <Col>
                <Button onClick={handleClick} style={theme}>{name}</Button>
            </Col>
        </Row>
    )
}

export default MarketSelect;