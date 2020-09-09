const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// Branching
router.post('/answer-to-routes', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const over18 = req.session.data['over-18']

  if (over18 === 'false') {
    res.redirect('https://google.com')
  } else {
    res.redirect('https://bing.com')
  }
})

// router.post('/branching/establishment-type-answer', function(req, res) {
//     const estType = req.session.data['establishment-conditional']
// })

router.post('/branching/application-type-answer', function (req, res) {
  const aprType = req.session.data['type-of-approval']


  switch (aprType) {
    case 'new-approval':
      res.redirect('/business-name')
      break
    case 'change-of-fbo':
      res.redirect('/change-of-fbo')
      break
    case 'new-fsa-approval':
      res.redirect('/new-fsa-approval')
      break
    case 'add-activities':
      res.redirect('/change-of-fbo')
      break

  }
})

router.post('/branching/business-type-answer', function (req, res) {
  const aprType = req.session.data['business-structure-type']

  switch (aprType) {
    case 'incorporation':
      res.redirect('/business-company-information')
      break
    case 'partnership':
      res.redirect('/business-structure-operator-name')
      break
    case 'sole-trader':
      res.redirect('/business-structure-operator-name')
      break
    case 'other':
      res.redirect('/business-structure-type-other')
      break

  }
})

router.post('/activities-throughput-2', function (req, res) {
  let est_slaughterhouse = false,
      est_gamehandling = false,
      est_cuttingplant = false,
      est_wholesale = false,
      est_mincedmeat = false,
      est_meatprep = false,
      est_mechanicallyseparated = false,
      est_processingplant = false,
      est_coldstore = false,
      est_repacking = false,
      est_rewrapping = false;

      const sessionData = req.session.data['establishment-conditional'];

  if (sessionData.length > 0) {
    for (var i = 0; i < sessionData.length; i++) {
      // Using if here as we are checking for includes rather than the full title. As this is a prototype this will suffice, will need to be looked at for production version.
      if (sessionData[i].includes("Slaughterhouse")) {
        est_slaughterhouse = true
      }
      else if (sessionData[i].includes("Game handling")) {
        est_gamehandling = true
      }
      else if (sessionData[i].includes("Cutting plant")) {
        est_cuttingplant = true
      }
      else if (sessionData[i].includes("Wholesale")) {
        est_wholesale = true
      }
      else if (sessionData[i].includes("Minced meat")) {
        est_mincedmeat = true
      }
      else if (sessionData[i].includes("Meat preparations")) {
        est_meatprep = true
      }
      else if (sessionData[i].includes("Mechanically separated")) {
        est_mechanicallyseparated = true
      }
      else if (sessionData[i].includes("Processing plant")) {
        est_processingplant = true
      }
      else if (sessionData[i].includes("Cold store")) {
        est_coldstore = true
      }
      else if (sessionData[i].includes("Re-packaging")) {
        est_repacking = true
      }
      else if (sessionData[i].includes("Re-wrapping")) {
        est_rewrapping = true
      }
    }
  }

  res.render('activities-throughput-2', {
    "est_slaughterhouse": est_slaughterhouse,
    "est_gamehandling": est_gamehandling,
    "est_cuttingplant": est_cuttingplant,
    "est_wholesale": est_wholesale,
    "est_mincedmeat": est_mincedmeat,
    "est_meatprep": est_meatprep,
    "est_mechanicallyseparated":est_mechanicallyseparated,
    "est_processingplant":est_processingplant,
    "est_coldstore":est_coldstore,
    "est_repacking":est_repacking,
    "est_rewrapping":est_rewrapping
  })
})



module.exports = router

