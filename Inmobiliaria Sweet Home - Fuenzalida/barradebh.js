document.addEventListener('DOMContentLoaded', function () {
    const habitacionesContainer = document.getElementById('habitaciones-container');
    const customPriceInput = document.getElementById('customPrice');
    const filterButton = document.getElementById('filterButton');
    let habitacionesData;

    // Cargar los datos del archivo JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'hdh.json', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            habitacionesData = JSON.parse(xhr.responseText);
            displayHabitaciones(habitacionesData.habitaciones);
        }
    };

    xhr.send();

    filterButton.addEventListener('click', filterHabitaciones);

    function filterHabitaciones() {
        const customPrice = parseFloat(customPriceInput.value);

        if (!isNaN(customPrice)) {
            const filteredData = habitacionesData.habitaciones.filter(habitacion => parseFloat(habitacion.precio) === customPrice);
            displayHabitaciones(filteredData);
        } else {
            // Si no se ingresa un valor válido, muestra todas las habitaciones
            displayHabitaciones(habitacionesData.habitaciones);
        }
    }

    function displayHabitaciones(data) {
        habitacionesContainer.innerHTML = '';

        data.forEach(function (habitacion) {
            const habitacionElement = createHabitacionElement(habitacion);
            habitacionesContainer.appendChild(habitacionElement);
        });
    }

    function createHabitacionElement(habitacion) {
        const habitacionElement = document.createElement('div');
        habitacionElement.classList.add('contenedocard2');

        const cardElement = document.createElement('div');
        cardElement.classList.add('cardcard2');

        const figureElement = document.createElement('figure');
        const imagenElement = document.createElement('img');
        imagenElement.classList.add('imagen2');
        imagenElement.src = habitacion.imagen;
        figureElement.appendChild(imagenElement);

        const contenidoElement = document.createElement('div');
        contenidoElement.classList.add('contenido');

        const tituloElement = document.createElement('h6');
        tituloElement.textContent = habitacion.titulo;

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = habitacion.descripcion;

        const infoElement = document.createElement('h5');
        infoElement.textContent = `⟰: ${habitacion.direccion}  ⮌: ${habitacion.antiguedad}   ⮔: ${habitacion.metros}   ⌧: ${habitacion.estado}`;

        const buttonElement = document.createElement('button');
        const enlaceElement = document.createElement('a');
        enlaceElement.classList.add('enlace2');
        enlaceElement.href = habitacion.enlace;
        enlaceElement.textContent = `Alquilar $${habitacion.precio}`;
        buttonElement.appendChild(enlaceElement);

        contenidoElement.appendChild(tituloElement);
        contenidoElement.appendChild(descripcionElement);
        contenidoElement.appendChild(infoElement);
        contenidoElement.appendChild(buttonElement);

        cardElement.appendChild(figureElement);
        cardElement.appendChild(contenidoElement);

        habitacionElement.appendChild(cardElement);

        return habitacionElement;
    }
});