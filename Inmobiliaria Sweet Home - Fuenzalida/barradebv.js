document.addEventListener('DOMContentLoaded', function () {
    const viviendasContainer = document.getElementById('viviendas-container');
    const customPriceInput = document.getElementById('customPrice');
    const filterButton = document.getElementById('filterButton');
    let viviendasData;

    // Cargar los datos del archivo JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'viv.json', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            viviendasData = JSON.parse(xhr.responseText);
            displayViviendas(viviendasData.viviendas);
        }
    };

    xhr.send();

    filterButton.addEventListener('click', filterViviendas);

    function filterViviendas() {
        const customPrice = parseFloat(customPriceInput.value);

        if (!isNaN(customPrice)) {
            const filteredData = viviendasData.viviendas.filter(vivienda => parseFloat(vivienda.precio) === customPrice);
            displayViviendas(filteredData);
        } else {
            // Si no se ingresa un valor válido, muestra todas las viviendas
            displayViviendas(viviendasData.viviendas);
        }
    }

    function displayViviendas(data) {
        viviendasContainer.innerHTML = '';

        data.forEach(function (vivienda) {
            const viviendaElement = createViviendaElement(vivienda);
            viviendasContainer.appendChild(viviendaElement);
        });
    }

    function createViviendaElement(vivienda) {
        const viviendaElement = document.createElement('div');
        viviendaElement.classList.add('contenedocard2');

        const cardElement = document.createElement('div');
        cardElement.classList.add('cardcard2');

        const figureElement = document.createElement('figure');
        const imagenElement = document.createElement('img');
        imagenElement.classList.add('imagen2');
        imagenElement.src = vivienda.imagen;
        figureElement.appendChild(imagenElement);

        const contenidoElement = document.createElement('div');
        contenidoElement.classList.add('contenido');

        const tituloElement = document.createElement('h6');
        tituloElement.textContent = vivienda.titulo;

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = vivienda.descripcion;

        const infoElement = document.createElement('h5');
        infoElement.textContent = `⟰: ${vivienda.direccion}  ⮌: ${vivienda.antiguedad}   ⮔: ${vivienda.metros}   ⌧: ${vivienda.estado}`;

        const buttonElement = document.createElement('button');
        const enlaceElement = document.createElement('a');
        enlaceElement.classList.add('enlace2');
        enlaceElement.href = vivienda.enlace;
        enlaceElement.textContent = `Comprar $ ${vivienda.precio}`;
        buttonElement.appendChild(enlaceElement);

        contenidoElement.appendChild(tituloElement);
        contenidoElement.appendChild(descripcionElement);
        contenidoElement.appendChild(infoElement);
        contenidoElement.appendChild(buttonElement);

        cardElement.appendChild(figureElement);
        cardElement.appendChild(contenidoElement);

        viviendaElement.appendChild(cardElement);

        return viviendaElement;
    }
});
