// Seleccionar elementos del DOM
const crearMazoBtn = document.getElementById("crearMazoBtn");
const cargaImagenes = document.getElementById("cargaImagenes");
const imagenInput = document.getElementById("imagenInput");
const mazo = document.getElementById("mazo");
const vistaPrevia = document.getElementById("vistaPrevia");
const mezclarBtn = document.getElementById("mezclarBtn");

// Crear y almacenar el array para las cartas (imágenes cargadas)
let cartas = [];

// Mostrar el área de carga de imágenes al hacer clic en "Crear Mazo"
crearMazoBtn.addEventListener("click", () => {
  cargaImagenes.style.display = "block";
});

// Función para cargar las imágenes seleccionadas
imagenInput.addEventListener("change", (event) => {
  const archivos = event.target.files;
  vistaPrevia.innerHTML = ""; // Limpiar vista previa
  cartas = []; // Reiniciar el array de cartas

  for (let i = 0; i < archivos.length; i++) {
    const archivo = archivos[i];
    const lector = new FileReader();

    lector.onload = (e) => {
      const imagenURL = e.target.result;
      cartas.push(imagenURL); // Agregar la imagen al array

      // Mostrar la imagen en la vista previa
      const img = document.createElement("img");
      img.src = imagenURL;
      img.classList.add("carta");
      vistaPrevia.appendChild(img);
    };

    lector.readAsDataURL(archivo); // Leer el archivo como URL de datos
  }

  mazo.style.display = "block"; // Mostrar el contenedor del mazo
});

// Función para generar y mezclar el mazo
mezclarBtn.addEventListener("click", () => {
  if (cartas.length === 0) {
    alert("Por favor, carga imágenes antes de generar el mazo.");
    return;
  }

  // Mezclar el array de cartas
  cartas = cartas.sort(() => Math.random() - 0.5); 

  // Ocultar la vista previa y el botón de mezclar
  vistaPrevia.style.display = "none";
  mezclarBtn.style.display = "none";

  // Crear botón de "Voltear una carta" y mostrar el primer mazo apilado
  const voltearBtn = document.createElement("button");
  voltearBtn.innerText = "Voltear una Carta";
  voltearBtn.id = "voltearBtn";
  mazo.appendChild(voltearBtn);

  const cartaActual = document.createElement("img");
  cartaActual.classList.add("carta");
  cartaActual.style.display = "none"; // Inicia oculta hasta el primer volteo
  mazo.appendChild(cartaActual);

  // Función para voltear una carta y mostrarla
  let index = 0;
  voltearBtn.addEventListener("click", () => {
    if (index < cartas.length) {
      cartaActual.src = cartas[index];
      cartaActual.style.display = "block"; // Mostrar la carta
      index++;
    } else {
      alert("Ya no quedan cartas en el mazo.");
      voltearBtn.disabled = true; // Deshabilitar el botón si el mazo se agotó
    }
  });
});
