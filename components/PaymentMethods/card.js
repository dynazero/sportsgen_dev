import { useRef } from 'react'

const Card = ({ paymentInfo }) => {

    const fileInputRef = useRef();


  return (
    <div className="row gy-3">
            <h4 className="mb-3" style={{fontStyle: 'italic', color: 'gray'}}>Will be Available Soon</h4>

    {/* <div className="col-md-6">
        <label htmlFor="cc-name" className="form-label">Name on card</label>
        <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
        <small className="text-muted">Full name as displayed on card</small>
        <div className="invalid-feedback">
            Name on card is required
        </div>
    </div>

    <div className="col-md-6">
        <label htmlFor="cc-number" className="form-label">Credit card number</label>
        <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
        <div className="invalid-feedback">
            Credit card number is required
        </div>
    </div>

    <div className="col-md-3">
        <label htmlFor="cc-expiration" className="form-label">Expiration</label>
        <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
        <div className="invalid-feedback">
            Expiration date required
        </div>
    </div>

    <div className="col-md-3">
        <label htmlFor="cc-cvv" className="form-label">CVV</label>
        <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
        <div className="invalid-feedback">
            Security code required
        </div>
    </div>

    <div className="col-md-6">
        <label htmlFor="uploadProof" className="form-label">Upload</label>
        <input
         type="file" 
         className="form-control" 
         id="uploadProof" 
         placeholder="" 
         ref={fileInputRef}
         onChange={(event) => handleUpload(event.target.files[0])}
         required
          />
        <div className="invalid-feedback">
            Valid Payment Photo required
        </div>
    </div> */}

</div>
  )
}

export default Card;