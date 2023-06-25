import connectDB from "../../connectDB"
import Category from "../../model/Category"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const categories = await Category.find({})
      res.status(200).json({ data: categories })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}