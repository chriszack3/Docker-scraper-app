import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';

function App() {
    useEffect(() => { 
        (async () => { 
            const response = await fetch('/api/getMarkets');
            const body = await response.json();
            console.log(body);
        })()
    }, []);
    return (
        <Container>
            <Row>
                <Col>
                    <h1>
                        asfasdfsdfs
                    </h1>
                </Col>
                <Col>
                    <h1>
                        sdfasdfasdfasdf
                    </h1>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
