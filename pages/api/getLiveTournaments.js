import connectDB from "../../connectDB"
import Tournament from "../../model/Tournament"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const categories = await Tournament.find({ status: { $ne: 'Closed' } });

      res.status(200).json({ data: categories })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
