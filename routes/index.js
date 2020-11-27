var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest: './uploads/'});

var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/subirfoto', function(req, res, next) {
  res.render('subirfoto');
});


router.post('/subirfoto', upload.array('foto', 2), function(req, res, next) {
    for(var x=0;x<req.files.length;x++) {
        //copiamos el archivo a la carpeta definitiva de fotos
       fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream('./public/images/'+req.files[x].originalname, function(error){}));
       //borramos el archivo temporal creado
       fs.unlink('./uploads/'+req.files[x].filename, function(error){});
    }  
    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se subieron las fotos</p>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);        
});


router.get('/verfotos', function(req, res, next) {
   fs.readdir('./public/images/', function(err, files) {  
      var pagina='<!doctype html><html><head></head><body>';
      for(var x=0;x<files.length;x++) {
          pagina+='<img src="images/'+files[x]+'"><br>';
      }
      pagina+='<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);        
   });
});


module.exports = router;

//Notas(o errores producidos!!): Primer problema(o el unico)
//Las direcciones de donde se 