import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "Organizer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, date, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // ✅ save path

    const event = await Event.create({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
      image, // ✅ add image
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    let events;
    if (req.user.role === "Organizer") {
      events = await Event.find({ organizer: req.user._id });
    } else if (req.user.role === "Admin") {
      events = await Event.find();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, date, location } = req.body;
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    if (req.file) event.image = `/uploads/${req.file.filename}`; // ✅ update image

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Event
// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ Use req.user.id (same as in createEvent)
    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await event.deleteOne();   // ✅ use deleteOne instead of remove
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err.message);
    res.status(500).json({ message: err.message });
  }
};
