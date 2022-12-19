const Calendar = require('../models/Calendar');

const getEvents = async (req,res) =>{

    try {
      const events = await Calendar.find().populate('user',"name");

      res.json({
        ok:true,
        events
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg:'Error del servidor'
      })
    }

   
}

const createEvent = async (req,res) =>{

  const uid = req.uid
  
  const event =  new Calendar({...req.body,user:uid});

  try {
  
   const eventSave = await event.save();

   res.json({
    ok:true,
    evento:eventSave
   })
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error del servidor'
    })
  }
    
 
}

const updateEvent = (req,res) =>{
     return res.json({
       ok: true,
       msg: "actualizar evento",
     });
}


const deleteEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: "borrar evento",
  });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}