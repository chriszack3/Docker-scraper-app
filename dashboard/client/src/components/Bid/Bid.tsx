const Bid = ({ price, size }: { price: string, size: string }) => {
    return (
        <div className="bidTable--row">
            <span>{price}</span>
            <span>{size}</span>
        </div>
    )
}

export default Bid;