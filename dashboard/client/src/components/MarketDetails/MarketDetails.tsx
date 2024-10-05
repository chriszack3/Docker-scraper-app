import { useSelector } from "react-redux";
import { MarketDetails, State } from "../../utils/types";
import './MarketDetails.scss'

const Market = ({ children, question_id }: {
    children: React.ReactNode;
    question_id: string;
}) => { 
    const markets = useSelector((state: State) => state.markets);
    const marketDetails = markets.find((m) => m.condition_id === question_id);
    if (!marketDetails) return null;
    const { question, description } = marketDetails
    
    return (
        <div className="marketDetails_container">
            <h2>{question}</h2>
            <p>{description}</p>
            {children}
        </div>
    )
}

export default Market;