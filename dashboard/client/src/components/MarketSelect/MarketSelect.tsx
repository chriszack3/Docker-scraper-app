import { useState, useEffect } from 'react';
import { Market } from '../../utils/types'
import checkmark from '../../assets/checkmark.png'
import xmark from '../../assets/xmark.png'
import { useDispatch, useSelector } from 'react-redux';
import { addTrackedMarket, removeTrackedMarket } from '../../redux/marketsSlice';
import './MarketSelect.scss'

//this will come from state
const themes: ['button_theme--red', 'button_theme--blue'] = ['button_theme--red', 'button_theme--blue'];

const MarketSelect = ({ market }: { market: Market }) => { 
    const { id, name, token } = market;

    //this will come from state
    const theme = themes[id - 1];
    //that will come from state

    //this will be redux
    const [selected, setSelected] = useState(false);
    //that will be redux
    const dispatch = useDispatch();

    const handleClick = (selected: boolean) => { 
        selected ? dispatch(removeTrackedMarket({ id })) : dispatch(addTrackedMarket({ id, name, token }));
        setSelected(!selected);

    }

    return (
        <div className='market--row'>
            <div className='market_trackBtn--col'>
                <button className={theme} onClick={() => handleClick(selected)}>Track</button>
            </div>
            <div className='market_name--col'>
                <h3>{name}</h3>
            </div>
            <div className='market_status--col'>
                {
                    selected ? <img style={{
                        width: '25px',
                        height: '25px',
                    }} src={checkmark} /> : <img style={{
                        width: '25px',
                        height: '25px',
                    }} src={xmark} />
                }
            </div>
        </div>
    )
}

export default MarketSelect;