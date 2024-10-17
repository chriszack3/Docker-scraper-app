export type Market = {
    id: number;
    name: string;
    token: string;
}

export type Token = {
    question_id: string;
    tokens: {
        token_id: string;
        outcome: string;
        price: number;
        winner: boolean;
    }[];
}

export type LiveMarket = {
    [key: string]: {
        bids: {
            [key: string]: Trade;
        };
        asks: {
            [key: string]: Trade;
        };
    };
}

export type State = {
    trackedMarkets: Market[];
    markets: MarketDetails[];
    tokens: Token[];
    liveMarkets: {
        [key: string]: {
            bids: {
                [key: string]: Trade;
            };
            asks: {
                [key: string]: Trade;
            };
            lastTrade: {
                asset_id: string;
                market: string;
                price: string;
                side: "BUY" | "SELL";
                size: string;
                timestamp: string;
            } | null;
        };
    };
}

export type Trade = {
    price: string;
    size: string;
}

export type BookEvent = {
    event_type: 'book';
    asset_id: string;
    hash: string;
    market: string;
    timestamp: string;
    bids: Trade[];
    asks: Trade[];
}

export type MarketDetails = {
    enable_order_book: boolean;
    active: boolean;
    closed: boolean;
    archived: boolean;
    accepting_orders: boolean;
    accepting_order_timestamp: string;
    minimum_order_size: number;
    minimum_tick_size: number;
    condition_id: string;
    question_id: string;
    question: string;
    description: string;
    market_slug: string;
    end_date_iso: string;
    game_start_time: string;
    seconds_delay: number;
    fpmm: string;
    maker_base_fee: number;
    taker_base_fee: number;
    notifications_enabled: boolean;
    neg_risk: boolean;
    neg_risk_market_id: string;
    neg_risk_request_id: string;
    icon: string;
    image: string;
    rewards: {
        rates: {
            asset_address: string;
            rewards_daily_rate: number;
        }[];
        min_size: number;
        max_spread: number;
    };
    is_50_50_outcome: boolean;
    tokens: {
        token_id: string;
        outcome: string;
        price: number;
        winner: boolean;
    }[];
    tags: string[];
}

export type Headline = {
    completed: boolean;
    description: string;
    id: number;
    publishedAgo: string;
    publisher: string;
    scrapedAtMS: number;
    title: string;
    url: string;
}
