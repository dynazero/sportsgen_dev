import connectDB from "../../connectDB"
import Tournament from "../../model/Tournament"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const tournament = await Tournament.findById( req.query.id );
      res.status(200).json({ data: tournament })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}



