import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedEvents = async () => {
  await Event.deleteMany({}); // ensure collection is empty

  const events = [
    {
      title: "Music Festival",
      description: "A night of live music with top bands.",
      date: new Date("2025-09-25"),
      location: "Neelambur Park",
      organizer: "68d252b4a62ba78d3e0edf4f", // replace with your organizer id
      image: "/uploads/dummy1.jpg",
    },
    {
      title: "Art Exhibition",
      description: "Local artists showcase their paintings.",
      date: new Date("2025-09-27"),
      location: "Coimbatore Art Gallery",
      organizer: "68d252b4a62ba78d3e0edf4f",
      image: "/uploads/dummy2.jpg",
    },
    {
      title: "Tech Meetup",
      description: "Meetup for developers and tech enthusiasts.",
      date: new Date("2025-09-30"),
      location: "Online",
      organizer: "68d252b4a62ba78d3e0edf4f",
      image: "/uploads/dummy3.jpg",
    },
  ];

  await Event.insertMany(events);
  console.log("Dummy events inserted ✅");
  mongoose.connection.close();
};

connectDB().then(seedEvents);
