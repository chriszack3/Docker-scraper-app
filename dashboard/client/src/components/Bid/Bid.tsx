const Bid = ({ price, size }: { price: string, size: string}) => { 
    return (
        <div>
            <p>Price: {price}</p>
            <p>Size: {size}</p>
        </div>
    )
}

export default Bid;