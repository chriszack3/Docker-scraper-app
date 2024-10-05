import { useSelector } from "react-redux";
import { MarketDetails, State } from "../../utils/types";

const Market = ({ children, market }: {
    children: React.ReactNode;
    market: MarketDetails;
}) => { 

    const { description } = market;
    return (
        <div>
            <h2>{description}</h2>
            {children}
        </div>
    )
}

export default Market;