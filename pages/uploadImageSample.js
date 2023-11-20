import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';

export default function UploadImageSample() {
  const [logo, setLogo] = useState();
  const successImage = () => toast.success("Image added");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', logo);

    try {
      const { data } = await axios.post('/api/upload', formData);
      successImage();
      console.log(data);
      
    } catch (error) {
      console.error('Error during axios request', error);
    }
  };

  return (
    <>
    <form onSubmit={submitHandler} className="needs-validation mainCategoryForm" noValidate>
      <div className="col-sm-6">
        <label htmlFor="uploadLogo" className="form-label">Upload sample image</label>
        <input
          type="file"
          className="form-control"
          id="uploadlogo"
          placeholder=""
          onChange={(e) => setLogo(e.target.files[0])}
          required
        />
        <div className="invalid-feedback">
          Please upload only valid format
        </div>

        <div className='col-md-4 offset-md-4'>
          <button className="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
        </div>
      </div>
    </form>
    </>
  );
}
