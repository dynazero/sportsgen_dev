import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './card'
import Gcash from './gcash'

const index = ({ paymentInfo }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.id);
    };

    useEffect(() => {
        // Check if the paymentInfo is a function before calling it.
        if (typeof paymentInfo === 'function') {
            paymentInfo({
                paymentMethod: selectedPaymentMethod,
                paymentProof: paymentProof
            });
        }
    }, [selectedPaymentMethod,paymentProof]);


    let content = null; // Initialize content as null
    if (selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'debit') {
        content = <Card key="card" paymentProof={setPaymentProof}/>;
       
    } else if (selectedPaymentMethod === 'gcash') {
        content = <Gcash key="gcash" paymentProof={setPaymentProof}/>;
    }

    return (

        <div>
            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
                <div className="form-check">
                    <input
                        id="gcash"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        onChange={handlePaymentMethodChange}
                        required
                    />
                    <label className="form-check-label" htmlFor="gcash">Gcash</label>
                </div>
                <div className="form-check">
                    <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        onChange={handlePaymentMethodChange}
                        required
                    />
                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="form-check">
                    <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        onChange={handlePaymentMethodChange}
                        required
                    />
                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                </div>
            </div>




            <TransitionGroup>
                <CSSTransition
                    key={selectedPaymentMethod}
                    timeout={300}
                    classNames="fade"
                >
                    <>
                        {content}
                    </>
                </CSSTransition>

            </TransitionGroup>

        </div>


    );
}

export default index