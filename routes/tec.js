var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.send('respond about TecNM 📣');
    res.render('about', {title: 'TecNM',
    setIcon:"../images/TecNM.png",
    style: '../stylesheets/style.css'});
  });

  router.get('/tec', function(_, res) {
    const styles = ["estilos.css","estilos2.css","estilos3.css"];
    const selectStyle = Math.floor(Math.random() * styles.length);
    res.render('tec', {javascript: "../scripts/script.js",
    style: `../stylesheets/${styles[selectStyle]}`,
    setIcon: '../images/TecNM.png',
    title: "About ITGAM"})
  });
  
  // GET /users/author
  router.get('/api/tec', function(_, res) {
    const images = ["itgam1.jpg","itgam2.jpg","itgam3.jpg","itgam4.jpg"];
    const selectImagen = Math.floor(Math.random() * images.length);
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
      image: `/images/${images[selectImagen]}`
    });
  });
  
  module.exports = router;