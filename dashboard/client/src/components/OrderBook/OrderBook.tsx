import { useSelector } from "react-redux";
import { State } from "../../utils/types";
import Book from "../Book/Book";

const OrderBook = ({ condition_id, outcome } : { condition_id: string, outcome: 'Yes' | 'No' }) => { 
    const tokens = useSelector((state: State) => state.tokens);
    const tokenObj = tokens.find((m) => m.question_id === condition_id);
    if (!tokenObj) return null;
    const token = tokenObj.tokens.find((t) => t.outcome === outcome);

    return (
        <div>
            { 
                token?.token_id && <Book token={token.token_id} />
            }
        </div>
    )
}

export default OrderBook;