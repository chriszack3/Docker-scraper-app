import { useEffect, useState } from "react";
import { Market, Headline } from "../../utils/types";
import './Headlines.scss';

const Headlines = ({ market }: { market: Market }) => {
    const [headlines, setHeadlines] = useState<Headline[]>([])

    useEffect(() => { 
        (async () => { 
            const response = await fetch(`/api/getHeadlines?table=${market.name}`)
            const body = await response.json()
            setHeadlines(body)
        })()
    }, [])
    return (
        <div className="headlines_container">
            {
                headlines?.length && headlines.map((headline) => {
                    const timestamp = new Date(headline.scrapedAtMS).toLocaleTimeString()
                    return (
                        <div key={headline.id}>
                        <a href={headline.url}>
                            <h3>{headline.title}</h3>
                        </a>
                        <p>{headline.description}</p>
                        <p>{timestamp}</p>
                        </div>
                    )
                })  
            }
        </div>
    )
}

export default Headlines;