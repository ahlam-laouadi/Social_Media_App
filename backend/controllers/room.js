const Room = require('../models/room');
const getRooms= async (req, res) => {
    const rooms = await Room.find();
    res.json({ rooms });
  };
  
module.exports = {getRooms}