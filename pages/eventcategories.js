import { useState, useEffect } from 'react'
import axios from 'axios';
import { useSession } from "next-auth/react"
import { toast } from "react-toastify";

export default function eventcategories() {

    const { data: session } = useSession()

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([])

    const successCategory = () => toast.success("Category added")

    const SubmitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        try{
            const { data } = await axios.post(`api/createEventCategory`, { categoryName }, config)
            console.log(data)
            successCategory()

        }catch(error){
            console.error("Error during axios request", error)
        }
    }

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get("/api/getEventCategory")
          setCategories(data.data)
        } catch (error) {
          console.error(error)
        }
      }
  
      fetchCategories()
    }, [])



    return (
        <>
            <div className='wrapperCategoryForm'>
                <div className='headerForm'>
                    <h2 className="mb-3">Add event category</h2>
                </div>
                <div className='containerCategoryForm'>
                    <form onSubmit={SubmitHandler} className="needs-validation mainCategoryForm" noValidate="" >
                        <div className="row g-3">
                            <div className="col-sm-12">
                                <label htmlFor="firstName" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" placeholder="Category" defaultValue={categoryName} onChange={(e) => setCategoryName(e.target.value)} required="" />
                                <div className="invalid-feedback">
                                    Valid Keyword is required.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className='col-md-4 offset-md-4'>
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
                        </div>
                    </form>

                    <div className='eventPost'>
                        <h4>Event Categories</h4>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.key}>{category.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
