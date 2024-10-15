import { useSelector } from "react-redux";
import { MarketDetails, State } from "../../utils/types";
import './MarketDetails.scss'

const Market = ({ children, condition_id }: {
    children: React.ReactNode;
    condition_id: string;
}) => { 
    const markets = useSelector((state: State) => state.markets);
    const marketDetails = markets.find((m) => m.condition_id === condition_id);
    if (!marketDetails) return null;
    const { question, description } = marketDetails
    
    return (
        <div className="marketDetails_container">
            <h2>{question}</h2>
            <p>{description}</p>
            <div className="marketDetails_container--children">
                {children}
            </div>
        </div>
    )
}

export default Market;