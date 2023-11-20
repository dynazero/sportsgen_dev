import { Datepicker } from '@adibfirman/react-datepicker'

export default function signup() {
  return (
    <>
   
    <form className="needs-validation" noValidate="" style={{ padding: '15vh' }}>
    <div className='p-2 bd-highlight eventHeader' style={{fontSize: '2rem', fontWeight: '500', lineHeight: '1.2',}}>
                  Athlete's Registration
                </div>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required="" />
          <div className="invalid-feedback">
            Valid first name is required.
          </div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="lastName" placeholder="" defaultValue="" required="" />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>

        <div className="col-sm-6" style={{ zIndex: '4' }}>
          <label htmlFor="lastName" className="form-label">Date Of Birth</label>
          {/* <input type="date" className="form-control" id="DateofBirth" placeholder="Select Date" defaultValue="" required="" ></input> */}
          <div className="form-control" style={{ height: '38px' }}>
            <Datepicker />
          </div>
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="uploadPhoto" className="form-label">Photo <span className="text-muted">(Optional)</span></label>
          <input type="file" className="form-control" id="uploadPhoto" placeholder="uploadPhto" />
          <div className="invalid-feedback">
            Please enter upload valid photo.
          </div>
        </div>
      </div>

      <hr className="my-4" />
    <div className='col-md-4 offset-md-4'>
      <button className="w-100 btn btn-primary btn-lg" type="submit">Submit Profile</button>
      </div>
    </form>
    </>
  )
}
