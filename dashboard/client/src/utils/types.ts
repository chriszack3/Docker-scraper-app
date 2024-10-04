export type Market = {
    id: number;
    name: string;
    token: string;
}


export type State = {
    markets: Market[];
}