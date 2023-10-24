import React, { useEffect, useState } from 'react'
import CartListPagination from '../Pagination/cartRegistrationList'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './button.module.css'




const Cart = ({ eventId, getTeamId, cartEvents, paymentInfo, athleteFill, cartUpdate }) => {

    const router = useRouter();

    const [cartEmpty, setCartEmpty] = useState(true);
    const [cartIndex, setCartIndex] = useState(0);
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState('checkout');

    const [total, setTotal] = useState(0);

    const handleRemoveItem = (indexToRemove) => {
        // Remove the item from the cart
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);

        // Recalculate the total
        const updatedTotal = updatedCart.reduce((sum, entry) => sum + entry.entryFee, 0);

        // Update the state
        setCart(updatedCart);
        cartUpdate(updatedCart);
        setTotal(updatedTotal);
    }

    useEffect(() => {
        setCartIndex(cartEvents.length);

        if (cartEvents.length !== 0) {
            setCartEmpty(false);
            setCart(cartEvents);

            const totalEntryFees = cartEvents.reduce((sum, entry) => sum + entry.entryFee, 0);
            setTotal(totalEntryFees);
        } else {
            setTotal(0);
        }
    }, [cartEvents]);

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
        // if (!teamRegistered) {
        const formData = new FormData();
        formData.append('tournamentId', eventId)
        formData.append('team', getTeamId)
        formData.append('registration', JSON.stringify(cartEvents));
        formData.append('paymentmethod', paymentInfo.paymentMethod);
        formData.append('paymentproof', paymentInfo.paymentProof);
        formData.append('status', status)

        const functionThatReturnPromise = axios.post(`../api/createCheckout`, formData);
        toast.promise(
            functionThatReturnPromise,
            {
                pending: 'Verifying information',
                success: 'Checkout saved, participants registered!, Proceeding to summary 👌',
                error: 'Error checkout 🤯'
            }
        ).then(
            (response) => {
                if (response.status === 201) { // If the checkout was created successfully
                    // Navigate to the checkout page using the received id after 3 seconds
                    setTimeout(() => {
                        router.push(`/checkout/${response.data.id}`);
                    }, 3000);
                    console.log("registered successfully");
                }
            }
        ).catch((error) => {
            if (error.response.status === 422) {
                toast.warning(error.response.data.message); // Show warning if team is already registered
            
                setTimeout(() => {
                    router.replace(router.asPath);
                }, 2000); // Adjust the time as per your requirement
            }

            console.error('Error submission on checkout:', error);
        });

        // } else {
        //     return toast.warning('Your team is already registered in this tournament');

        // }

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
                                <CartListPagination cartItems={cart} handleRemoveItem={handleRemoveItem}/>
                        </>
                    )}
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (PHP)</span>
                        <strong>₱{total}</strong>
                    </li>
                </ul>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">Continue »</button>
            </form>
        </>
    )
}

export default Cart;