import React from 'react'

export default function RegistrationBody() {
    return (
        <>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your Events</span>
                        <span className="badge bg-primary rounded-pill">3</span>
                    </h4>
                    <ul className="list-group mb-3">
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
                    <hr className="my-4" />

                    {/* <form className="card p-2">
                                <div className="input-group">
                                  <input type="text" className="form-control" placeholder="Promo code" />
                                  <button type="submit" className="btn btn-secondary">Redeem</button>
                                </div>
                              </form> */}
                    <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Fill up form</h4>
                    <form className="needs-validation" noValidate="" />
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="firstName" className="form-label">Athlete Name</label>
                            {/* <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required="" /> */}
                            <div>
                                {/* dropdown options */}
                                {/* <button class="btn btn-secondary dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Choose a participant
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li><h6 class="dropdown-header">Athletes:</h6></li>
                                      <li><a class="dropdown-item" href="#">Kyle</a></li>
                                      <li><a class="dropdown-item" href="#">Chris</a></li>
                                    </ul> */}
                                <select className="form-select mb-3 form-control fontWeight400" id="NameSelection" aria-label=".form-select-lg example">
                                    <option>Choose Name..</option>
                                    <option>Kyle</option>
                                    <option>James</option>
                                    <option>Chris</option>
                                </select>

                            </div>
                            <div className="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>

                        <div className="col-sm-6" style={{ zIndex: '4' }}>
                            <label htmlFor="lastName" className="form-label">Date Of Birth</label>
                            {/* <input type="date" className="form-control" id="DateofBirth" placeholder="Select Date" defaultValue="" required="" ></input> */}
                            <div className="form-control" style={{ height: '38px' }}>
                            </div>
                            <div className="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                {/* <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required="" /> */}
                                <select className="form-select mb-3 form-control fontWeight400" id="username" aria-label=".form-select-lg example">
                                    <option>Choose Category..</option>
                                    <option>Cadet Kata Male</option>
                                    <option>Cadet Kumite Female</option>
                                    <option>Cadet Kumite Male</option>
                                </select>
                                <div className="invalid-feedback">
                                    Your username is required.
                                </div>
                            </div>
                        </div>



                        {/* 
                                <div className="col-md-5">
                                  <label htmlFor="country" className="form-label">Country</label>
                                  <select className="form-select" id="country" required="">
                                    <option defaultValue="">Choose...</option>
                                    <option>United States</option>
                                  </select>
                                  <div className="invalid-feedback">
                                    Please select a valid country.
                                  </div>
                                </div> */}

                        {/* <div className="col-md-4">
                                  <label htmlFor="state" className="form-label">State</label>
                                  <select className="form-select" id="state" required="">
                                    <option defaultValue="">Choose...</option>
                                    <option>California</option>
                                  </select>
                                  <div className="invalid-feedback">
                                    Please provide a valid state.
                                  </div>
                                </div> */}

                        {/* <div className="col-md-3">
                                  <label htmlFor="zip" className="form-label">Zip</label>
                                  <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Zip code required.
                                  </div>
                                </div>*/}
                    </div>



                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                        <div className="form-check">
                            <input
                                id="credit"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                // checked="" 
                                required="" />
                            <label className="form-check-label" htmlFor="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                            <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                        </div>
                        <div className="form-check">
                            <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                            <label className="form-check-label" htmlFor="paypal">Gcash</label>
                        </div>
                    </div>

                    <div className="row gy-3">
                        <div className="col-md-6">
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
                            <input type="file" className="form-control" id="uploadProof" placeholder="" required="" />
                            <div className="invalid-feedback">
                                Valid Payment Photo required
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}
