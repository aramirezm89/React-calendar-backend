const Calendar = require("../models/Calendar");

const getEvents = async (req, res) => {
  try {
    const events = await Calendar.find().populate("user", "name");

    res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

const createEvent = async (req, res) => {
  const uid = req.uid;

  const event = new Calendar({ ...req.body, user: uid });

  try {
    const eventSave = await event.save();

    res.json({
      ok: true,
      evento: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

const updateEvent = async (req, res) => {

  const eventId = req.params.id;
  const uid = req.uid // id del usuario logeado (seteado en el midleware de validar token)

  try {
    const eventDB = await Calendar.findById(eventId);

    if (!eventDB) {
      return res.status(404).json({
        ok:false,
        msg:'No existe el evento'
      });
    }
    
  
    if(uid !== eventDB.user.toString())
    {
      return res.status(401).json({
        ok:false,
        msg:'No tiene persimo para realizar la acción'
      })
    }
     
    const updateEvent = await Calendar.findByIdAndUpdate(eventId,req.body,{new:true})

    res.json({
      ok:true,
      msg:'Evento actualizado',
      event:updateEvent
    })
  } catch (error) 
  {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Error del servidor'
    })
  }

 
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid // id del usuario logeado (seteado en el midleware de validar token)

  try {
    const eventDB = await Calendar.findById(eventId);

    if (!eventDB) {
      return res.status(404).json({
        ok:false,
        msg:'No existe el evento'
      });
    }
    
  
    if(uid !== eventDB.user.toString())
    {
      return res.status(401).json({
        ok:false,
        msg:'No tiene persimo para realizar la acción'
      })
    }

    await Calendar.findByIdAndDelete(eventId);

    res.json({
      ok:true,
      msg:'Evento eliminado'
    })
  }
  catch (error)
  {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error del servidor'
    })
  }  
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
