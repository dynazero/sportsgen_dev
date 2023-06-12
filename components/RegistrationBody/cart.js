import React, { useEffect, useState } from 'react'

const Cart = ({ cartEvents }) => {


    const [cartEmpty, setCartEmpty] = useState(true);
    const [cartIndex, setCartIndex] = useState(0);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        if (cartEvents.length !== 0) {
            setCartEmpty(false)
            setCart(cartEvents)
        }
    }, [])

    useEffect(() => {
        setCartIndex(cartEvents.length);
    }, [cartEvents])

    console.log(cart,'this is cart')

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
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>

                                    <h6 className="my-0">{cartList.participant}</h6>
                                    <small className="text-muted">{cartList.event}</small>
                                </div>
                                {/* <span className="text-muted">{item.price[0]}</span> */}
                                <span className="text-muted">Item Price</span>

                            </li>
                        ))}
                    </>
                )}
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>

                        <h6 className="my-0">Short Item Title</h6>
                        <small className="text-muted">Short Description</small>
                    </div>
                    {/* <span className="text-muted">{item.price[0]}</span> */}
                    <span className="text-muted">Item Price</span>

                </li>

                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        {/* <h6 className="my-0">{item.shortTitle[0]}</h6> */}
                        <h6 className="my-0">Short Item Title</h6>
                        {/* <small className="text-muted">{item.shortDescription[0]}</small> */}
                        <small className="text-muted">Short Description</small>
                    </div>
                    {/* <span className="text-muted">{item.price[0]}</span> */}
                    <span className="text-muted">Item Price</span>

                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        {/* <h6 className="my-0">{item.shortTitle[1]}</h6> */}
                        <h6 className="my-0">Short Title</h6>
                        {/* <small className="text-muted">{item.shortDescription[1]}</small> */}
                        <small className="text-muted">Short Description</small>
                    </div>
                    {/* <span className="text-muted">{item.price[1]}</span> */}
                    <span className="text-muted">Item Price</span>
                </li>
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
                    <strong>₱230</strong>
                </li>
            </ul>
        </>
    )
}

export default Cart