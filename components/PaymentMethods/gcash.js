import React, { useState, useRef } from 'react'

const Gcash = ({ paymentProof }) => {
    
    const fileInputRef = useRef();

    const handleUpload = (value) => {
        paymentProof(value)
    }
    
    return (
        <div className="col-md-8" style={{marginLeft: '95px', paddingTop: '20px'}}>
            <label htmlFor="uploadProof" className="form-label">Upload Payment</label>
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
            <span style={{fontStyle: 'italic', color: 'gray'}}>screenshot with visible reference number</span>
        </div>
    )
}

export default Gcash