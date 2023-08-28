import connectDB from "../../connectDB"
import Checkout from "../../model/Checkout"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const checkout = await Checkout.find({ team: req.query.team,  status: { $ne: 'Closed' }})
      res.status(200).json({ data: checkout })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
