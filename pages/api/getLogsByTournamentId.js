import connectDB from "../../connectDB"
import Log from "../../model/Logs"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const { tournamentId } = req.query;
      const tournaments = await Log.find({ tournamentId }).sort('-logTime');

      const modifiedTournaments = tournaments.map(tournament => {
        const logTime = new Date(tournament.logTime);

        return {
          ...tournament._doc, 
          formattedDate: logTime.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }), // Convert logTime to formatted date string
          formattedTime: logTime.toLocaleTimeString('en-US', { hour12: true }) // Convert logTime to formatted time string
        };
      });

      res.status(200).json({ data: modifiedTournaments })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
