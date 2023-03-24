
import connectDB from "../../connectDB"
import Event from "../../model/eventSchema"
import uploadMiddleware from "./uploadMiddleware";
import middlewareRunner from "./middleware";

connectDB()

function convertToPST(date) {
    const offset = 8 * 60 * 60 * 1000; // Offset in milliseconds for UTC+8
    return new Date(date.getTime() + offset);
  }

export default async (req, res) => {
    try {
            if (req.method === "POST") {
                const {
                    eventName,
                    startDate,
                    endDate,
                    city,
                    barangay,
                    zip,
                    address,
                    entryFee,
                } = JSON.parse(req.body);
    
    
                const eventVerify = await Event.findOne({ title: eventName })
                // console.log(categoryName)
                if (eventVerify) {
                    res.status(422).json({ message: "Event already exist" })
                }
    
                const newEvent = new Event({
                    eventName,
                    startDate: convertToPST(new Date(startDate)),
                    endDate: convertToPST(new Date(endDate)),
                    city,
                    barangay,
                    zip,
                    address,
                    entryFee,
                    uniqueFileName: req.uniqueFileName,
                });
    
                await newEvent.save();
                res.status(201).json({ message: "Event created successfully" });
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

