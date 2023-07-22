import connectDB from "../../connectDB";
import Event from "../../model/Event";

connectDB();

export default async (req, res) => {
  if (req.method === "PUT") {
    const { eventId } = req.body;

    try {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, { eventStatus: 'ready' });
      res.status(200).json({ message: "Event status updated" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
