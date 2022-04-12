const {exec} = require('child_process')
const express = require('express')
var router = express.Router();
var app = express()
const bodyParser = require('body-parser')
const prependhttp = require('prepend-http')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.post('/', (req, res) => {
 var website = prependhttp(req.body.site);
 console.log(website);
  exec(`brkn ${website} --verbose`, (err, stdout, stderr) => {
 
    if (err) {
      res.send(err)
    }
    console.log(stdout)
 
    res.send(stdout);
  })
})
 

module.exports = router;