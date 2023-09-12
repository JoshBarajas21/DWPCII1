const images = ["itgam1.jpg","itgam2.jpg","itgam3.jpg","itgam4.jpg"];
const selectImagen = Math.floor(Math.random() * images.length);

console.log(images[selectImagen]);

document.getElementById("imagen").innerHTML = `<img src="/images/${images[selectImagen]}" alt="Imagen de ITGAM">`;
