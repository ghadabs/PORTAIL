const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const absence = require('../models/absence');
const seance = require('../models/seance');
const note = require('../models/note');

//add matiere
router.post('/addMatiere/', async (req, res) => {
  const matiereResult = await matiere.create(req.body).catch(err => err);
  res.send({ data: matiereResult })
})

//get number of absences by id student and id matiere
router.get('/absNb/:id/:idM', async (req, res) => {
 const absResult = await absence.find({"matiere" : req.params.idM}).populate('matiere').exec();
 const absResult1 = await absence.countDocuments({ "user":req.params.id ,"matiere": req.params.idM }).exec();
  res.send({ data: absResult1 ,info:absResult})
})

//get matiere by id
router.get('/getBy/:id', async (req, res) => {
  const matiereResult = await matiere.findOne({ "_id": req.params.id}).exec();
  res.send({ data: matiereResult })
})
router.get('/getTypeMat/:idMat/:idGrp/:idProf', async (req, res) => {
  const matiereResult = await seance.find({ "matiere": req.params.idMat,"groupe": req.params.idGrp,"professeur": req.params.idProf}).distinct('type').exec();
  res.send({ data: matiereResult })
})
//get matiere by id professeur
router.get('/getMatByProf/:idPro', async (req, res) => {
  const matiereResult = await seance.find({"professeur":req.params.idPro }).distinct('matiere').exec() ;
  res.send({ data: matiereResult })
})
//get matiere by idGrp  pour etudiant tache
router.get('/getByGrp/:idG', async (req, res) => {
  const seanceResult = await seance.find({"groupe":{$in:req.params.idG}}).distinct("matiere").populate("matiere").exec() ;
  res.send({ data:seanceResult })
})
//get groupes by idMat  pour professeur "note"
router.get('/getGrpByMat/:idMAt', async (req, res) => {
  const groupeResult = await seance.find({"matiere":req.params.idMAt}).distinct("groupe").populate("groupe").exec() ;
  res.send({ data:groupeResult })
})


//add absence by id matiere and id etudiant
router.post('/addAbs/:idm/:idS/:id/:dateSeance', async (req, res) => {
  req.body.matiere = req.params.idm;
  req.body.user = req.params.id;
  req.body.seance = req.params.idS;
  req.body.DateAbs = req.params.dateSeance;
  const absResult = await absence.create(req.body).catch(err => err);
  res.send({ data: absResult })
})

//getAbsence
router.get('/Abs/:idm/:idS/:id', async (req, res) => {
   const absResult = await absence.findOne({"matiere":req.params.idm ,"seance": req.params.idS,"user": req.params.id }).populate("absence").exec();
  res.send({ data: absResult })
})

//getAbsenceByUser
router.get('/Abs/:id', async (req, res) => {
  const absResult = await absence.findOne({"user": req.params.id }).populate("absence").exec();
 res.send({ data: absResult })
})


//getAbsenceByMatDate
router.get('/Abs/:idm/:DateAbs', async (req, res) => {
  const absResult = await absence.find({"matiere":req.params.idm ,"DateAbs": req.params.DateAbs}).populate("absence").exec();
 res.send({ data: absResult })
})

//delete absence
router.post('/deleteAbs/:id', async (req, res) => {
    const absenceResult = await absence.deleteOne({ "_id": req.params.id }).exec();
    res.send({ data: absenceResult })
    
})

router.post('/deleteSceance/:idS', async (req, res) => {
  const profResult = await professeur.findOne({ seances: req.params.idS }).exec()
  const groupeRes = await groupe.findOne({ seances: req.params.idS }).exec()
  const matiereRes = await matiere.findOne({ seances: req.params.idS }).exec()
  const profUpdateResult = await professeur.updateOne({ _id: profResult._id },
    { $pull: { seances: req.params.idS } }).exec() 
  const groupUpdateResult = await groupe.updateOne({ _id: groupeRes._id },
      { $pull: { seances: req.params.idS } }).exec()
  const matiereUpdateResult = await matiere.updateOne({ _id: matiereRes._id },
      { $pull: { seances: req.params.idS } }).exec()
  
  const Result = await seance.deleteOne({ _id: req.params.idS }).exec()
  // const delResult = await comments.update({ "_id": ObjectId(req.params.id) }, { $set: { [`articles.${i}`]: req.body } }).exec();
  res.send({ data: Result })
  
})
//get matieres by user
// router.get('/matieres/:idU', async (req, res) => {
//   const matiereResult = await matiere.find({ "user": req.params.idU}).exec(); 
//  // console.log(groupeResult);
//   res.send({ data: matiereResult})
//  })

//get matiere by groupeId
// router.get('/mat/:idgrp', async (req, res) => {
//   const matiereResult = await matiere.find({ "groupe": req.params.idgrp }).exec(); 
//  // console.log(groupeResult);
//   res.send({ data: matiereResult})
//  })

 //get number of absences by matiere and student
// router.get('/absNb/:id/:nom', async (req, res) => {
//   //const matiereResult = await matiere.find({"nom_matiere" : req.params.nom}).populate('user').exec();
//   const absResult = await absence.find({"nom_matiere" : req.params.nom}).populate('user').exec();
//  const absResult1 = await absence.countDocuments({ "user":req.params.id ,"nom_matiere": req.params.nom }).exec();
//   res.send({ data: absResult1 ,info:absResult})
// })

//get matiere by name
// router.get('/getBy/:name', async (req, res) => {
//   const matiereResult = await matiere.findOne({ "nom": req.params.name}).exec();
//   res.send({ data: matiereResult })
// })


 //get matieres by user
// router.get('/matieres/:idU', async (req, res) => {
//   const matiereResult = await matiere.find({ "user": req.params.idU}).exec(); 
//  // console.log(groupeResult);
//   res.send({ data: matiereResult})
//  })

 //get matiere by groupeId
// router.get('/mat/:idgrp', async (req, res) => {
//   const matiereResult = await matiere.find({ "groupe": req.params.idgrp }).exec(); 
//  // console.log(groupeResult);
//   res.send({ data: matiereResult})
//  })

//add matiere to etudiant
// router.post('/addMatiere', async (req, res) => {
//   const matiereResult = await matiere.create(req.body).catch(err => err);
//   const userResult = await user.updateMany( { $push: { matieres: matiereResult._id } }).exec();
//   console.log(matiereResult)
//   res.send({ data: userResult });
  
// })

//add matiere by prof
// router.post('/addMatiereProf/:idP', async (req, res) => {
//   req.body.professeur = req.params.idP;
//   const matiereResult = await matiere.create(req.body).catch(err => err);
//   const profResult = await professeur.updateOne({ "_id": req.params.idP }, { $push: { matieres: matiereResult._id } }).exec();
//   console.log(matiereResult)
//   res.send({ data: profResult })
// })

//get matiere by prof
// router.get('/:idP', async (req, res) => {
//   const matiereResult = await matiere.find({ "professeur": req.params.idP }).exec();
//   res.send({ data: matiereResult })
// })

//add matiere by groupe
// router.post('/addMatiere/:idGrp', async (req, res) => {
//   req.body.groupe = req.params.idGrp;
//   const matiereResult = await matiere.create(req.body).catch(err => err);
//   const groupeResult = await groupe.updateOne({ "_id": req.params.idGrp }, { $push: { matiere: matiereResult._id } }).exec();
//   res.send({ data: groupeResult })
// })


// add matiere by etudiant
// router.post('/addMatiereEtudiant/:id', async (req, res) => {
//   req.body.user = req.params.id;
//   const matiereResult = await matiere.create(req.body).catch(err => err);
//   const userResult = await user.updateOne({ "_id": req.params.id }, { $push: { matieres: matiereResult._id } }).exec();
//   res.send({ data: userResult })
// })

//get matieres by etudiant
// router.get('/:idE', async (req, res) => {
//   const matiereResult = await matiere.find({ "user": req.params.idE }).ppopulate("user").exec();
//   res.send({ data: matiereResult })
// })
module.exports = router;