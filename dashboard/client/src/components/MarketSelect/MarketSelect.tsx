import { useState, useEffect } from 'react';
import { Market } from '../../utils/types'
import checkmark from '../../assets/checkmark.png'
import xmark from '../../assets/xmark.png'
import { useDispatch, useSelector } from 'react-redux';
import { addMarket } from '../../redux/marketsSlice';
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
    const markets = useSelector((state: any) => state.markets);
    const dispatch = useDispatch();

    const handleClick = (selected: boolean) => { 
        setSelected(!selected);
        dispatch(addMarket(market));
    }

    useEffect(() => { 
        console.log(markets);
    }, [markets])

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