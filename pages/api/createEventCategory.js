import connectDB from "../../connectDB"
import Category from "../../model/Category"

connectDB()

export default async (req, res) => {
    try {
      if (req.method === "POST") {
        const { categoryName } = req.body
        const titleVerify = await Category.findOne({ title: categoryName })
        console.log(categoryName)
        if (titleVerify) {
          res.status(422).json({ message: "Category already exist" })
        }
  
        // Get the maximum key value in the categories
        const maxKeyCategory = await Category.findOne().sort({ key: -1 })
  
        // Set the new key to 1 if no categories exist, else increment the max key value by 1
        const newKey = maxKeyCategory ? maxKeyCategory.key + 1 : 1
  
        const newCategory = await new Category({ key: newKey, title: categoryName }).save()
        res.status(200).json({ message: "Category Verification Completed" })
      } else {
        // Handle non-POST requests
        res.status(405).json({ message: "Method Not Allowed" })
      }
    } catch (error) {
      console.log("Error:", error.message) // Log the error message
      console.log("Error stack trace:", error.stack) // Log the error stack trace
      res.status(500).json({ message: "Server error" })
    }
  }