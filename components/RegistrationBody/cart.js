import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const Cart = ({ cartEvents, paymentInfo, eventId, athleteFill }) => {


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

    // useEffect (() => {
    //     if(payment === undefined){
    //         console.log('im undefined')
    //     } 
    // }, [payment])

    const SubmitHandler = async (e) => {
        e.preventDefault();

        if (!athleteFill) {
            return toast.warning('Please sign up an athlete before registration');
        }

        if (cartEvents.length === 0) {
            return toast.warning('Please add an athlete and event before checkout');
        }

        if (paymentInfo.paymentMethod === null) {
            return toast.warning('Please choose a payment method');
        }

        if (paymentInfo.paymentProof === null) {
            return toast.warning('Please upload your payment screenshot for verification');
        }

        // console.log('Information Complete, ready for submition')

    }

    return (
        <>
            <form
                onSubmit={SubmitHandler}
                className="needs-validation"
                noValidate="" >
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
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (PHP)</span>
                        <strong>₱{total}</strong>
                    </li>
                </ul>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
            </form>
        </>
    )
}

export default Cart