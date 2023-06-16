import React, { useEffect, useState } from 'react'

const Cart = ({ cartEvents }) => {


    const [cartEmpty, setCartEmpty] = useState(true);
    const [cartIndex, setCartIndex] = useState(0);
    const [cart, setCart] = useState([]);
    
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        setCartIndex(cartEvents.length);
        if (cartEvents.length !== 0) {
            setCartEmpty(false)
            setCart(cartEvents)

            const totalEntryFees = cartEvents.reduce((sum, entry) => sum + entry.entryFee, 0);
            setTotal(totalEntryFees)
        }
    }, [cartEvents])


    return (
        <>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your Events</span>
                <span className="badge bg-primary rounded-pill">{cartIndex}</span>
            </h4>
            <ul className="list-group mb-3">
                {!cartEmpty && (
                    <>
                        
                        {cart.map((cartList, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                                <div>

                                    <h6 className="my-0">{cartList.categoryName}</h6>
                                    <small className="text-muted">{cartList.participantName}</small>
                                </div>
                                {/* <span className="text-muted">{item.price[0]}</span> */}
                                <span className="text-muted">{cartList.entryFee}</span>

                            </li>
                        ))}
                    </>
                )}
                {/* <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.shortTitle[2]}</h6>
                <small className="text-muted">{item.shortDescription[2]}</small>
              </div>
              <span className="text-muted">{item.price[2]}</span>
            </li> */}
                {/*<li className="list-group-item d-flex justify-content-between bg-light">
               <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">−$5</span> 
            </li>*/}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (PHP)</span>
                    <strong>₱{total}</strong>
                </li>
            </ul>
        </>
    )
}

export default Cart