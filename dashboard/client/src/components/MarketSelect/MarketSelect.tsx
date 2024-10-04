import { useState } from 'react';
import { Col, Row, Stack, Button } from 'react-bootstrap';
import { Market } from '../../utils/types'
import checkmark from '../../assets/checkmark.png'
import xmark from '../../assets/xmark.png'
import './MarketSelect.scss'

//this will come from state
const themes: ['button_theme--red', 'button_theme--blue'] = ['button_theme--red', 'button_theme--blue'];

const MarketSelect = ({ market }: { market: Market }) => { 
    const { id, name } = market;

    //this will come from state
    const theme = themes[id - 1];
    //that will come from state

    //this will be redux
    const [selected, setSelected] = useState(false);
    //that will be redux

    const handleClick = (selected: boolean) => { 
        setSelected(!selected);
    }
    return (
        <Stack direction='horizontal'>
            <Button className={theme} onClick={() => handleClick(selected)}>Track</Button>
            <h3>{name}</h3>
            {
                selected ? <img style={{
                    width: '20px',
                    height: '20px',
                }} src={checkmark} /> : <img style={{
                    width: '20px',
                    height: '20px',
                }} src={xmark} />
            }
        </Stack>
    )
}

export default MarketSelect;