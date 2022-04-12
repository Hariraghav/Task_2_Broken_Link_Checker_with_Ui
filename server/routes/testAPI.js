/* var express = require("express");
var router = express.Router();
var axios = require("axios");
var website = '';
var sites = [];
var { SiteChecker } = require("broken-link-checker");
router.post('/', (req, res) => {
website = req.body.site;
console.log(website);
var c = 0;

const siteChecker = new SiteChecker(
    { 
        excludeInternalLinks: false,
        excludeExternalLinks: false, 
        filterLevel: 0,
        acceptedSchemes: ["http", "https"],
        excludedKeywords: ["linkedin"],
    },
    {
        "error": (error) => {
            console.error(error);
        },
        "link": (result) => {
           
            if(result.broken) {
               if(result.http.response && ![undefined, 200].includes(result.http.response.statusCode)) {
                 sites.push(result.http.response.statusCode)
                 console.log(`${result.http.response.statusCode} => ${result.url.original}`);
                   
               }
           }
         

        },
        "end": () => {
            console.log("All links are scanned");
            
        }
    }
);

siteChecker.enqueue(website);
console.log(sites);
router.get("/", function(req, res, next) {
   res.write(result.url.original);

}
);
 }); */



/*  const getBreeds = async () => {
   try {
     return await axios.get('/')
   } catch (error) {
     console.error(error)
   }
 }
 
 const countBreeds = async () => {
   const breeds = await getBreeds()
   console.log(breeds);
 }
 countBreeds() */

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