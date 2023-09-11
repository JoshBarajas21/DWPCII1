var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.send('respond about TecNM 📣');
    res.render('about', {title: 'TecNM',
  setIcon:"../images/TecNM.png"});
  });

  router.get('/tec', function(_, res) {
    res.render('tec', {script: "./scripts/script.js"})
  });
  
  // GET /users/author
  router.get('/api/tec', function(_, res) {
    res.json({
      name: "Tec de Gustavo A. Madero",
      description: `Universidad ubicada en la Delegación del mismo nombre, con una trayectoria amplia en la formación de Ingenieros especializados y preparados para el campo laboral, con apititudes y diferentes habilidades.`,
      mission: "Formar con responsabilidad y excelencia a profesionistas capaces de enfrentar y resolver los retos que se presentan en el ámbito nacional e internacional.",
      values: {
        valor1: "Respeto",
        valor2: "Liderazgo",
        valor3: "Perseverancia",
        valor4: "Resposabilidad"
      },
      image: "imgen aleatoria del tec"
    });
  });
  
  module.exports = router;