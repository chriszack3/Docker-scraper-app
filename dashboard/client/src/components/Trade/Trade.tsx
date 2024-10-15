import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../utils/types";

const Trade = ({ token, price, side }: { 
    token: string;
    price: string;
    side: string;
}) => {
    const trade = side === 'bids' ? useSelector((state: State) => state.liveMarkets[token].bids[price]) : useSelector((state: State) => state.liveMarkets[token].asks[price]);
    const size = trade.size;
    const sizeRef = useRef(size);
    const [sizeChange, setSizeChange] = useState("0");

    useEffect(() => { 
        if (size !== sizeRef.current) {
            const change = String(Number(size) - Number(sizeRef.current))
            setSizeChange(change);
            setTimeout(() => {
                setSizeChange("0");
            }, 5000)
        }
        sizeRef.current = size
    }, [size])

    return (
        <div className="bidTable--row">
            <span>{price}</span>
            <span style={{
                backgroundColor: sizeChange !== "0" ? 'yellow' : 'transparent',
            }}>{size}</span>
            <span>{sizeChange !== "0" && sizeChange}</span>
        </div>
    )
}

export default Trade;