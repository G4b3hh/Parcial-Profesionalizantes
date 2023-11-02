document.addEventListener('DOMContentLoaded', function () {
    const propiedadesContainer = document.getElementById('propiedades-container');
    const customPriceInput = document.getElementById('customPrice');
    const filterButton = document.getElementById('filterButton');
    let propiedadesData;

    // Cargar los datos del archivo JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'datos.json', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            propiedadesData = JSON.parse(xhr.responseText);
            displayPropiedades(propiedadesData.propiedades);
        }
    };

    xhr.send();

    filterButton.addEventListener('click', filterProperties);

    function filterProperties() {
        const customPrice = parseFloat(customPriceInput.value);

        if (!isNaN(customPrice)) {
            const filteredData = propiedadesData.propiedades.filter(property => parseFloat(property.precio) === customPrice);
            displayPropiedades(filteredData);
        } else {
            // Si no se ingresa un valor válido, muestra todas las propiedades
            displayPropiedades(propiedadesData.propiedades);
        }
    }

    function displayPropiedades(data) {
        propiedadesContainer.innerHTML = '';

        data.forEach(function (propiedad) {
            const propiedadElement = createPropertyElement(propiedad);
            propiedadesContainer.appendChild(propiedadElement);
        });
    }

    function createPropertyElement(propiedad) {
        const propiedadElement = document.createElement('div');
        propiedadElement.classList.add('contenedocard2');

        const cardElement = document.createElement('div');
        cardElement.classList.add('cardcard2');

        const figureElement = document.createElement('figure');
        const imagenElement = document.createElement('img');
        imagenElement.classList.add('imagen2');
        imagenElement.src = propiedad.imagen;
        figureElement.appendChild(imagenElement);

        const contenidoElement = document.createElement('div');
        contenidoElement.classList.add('contenido');

        const tituloElement = document.createElement('h6');
        tituloElement.textContent = propiedad.titulo;

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = propiedad.descripcion;

        const infoElement = document.createElement('h5');
        infoElement.textContent = `⟰: ${propiedad.direccion}  ⮌: ${propiedad.antiguedad}   ⮔: ${propiedad.metros}   ⌧: ${propiedad.estado}`;

        const buttonElement = document.createElement('button');
        const enlaceElement = document.createElement('a');
        enlaceElement.classList.add('enlace2');
        enlaceElement.href = propiedad.enlace;
        enlaceElement.textContent = `Comprar $ ${propiedad.precio}`;
        buttonElement.appendChild(enlaceElement);

        contenidoElement.appendChild(tituloElement);
        contenidoElement.appendChild(descripcionElement);
        contenidoElement.appendChild(infoElement);
        contenidoElement.appendChild(buttonElement);

        cardElement.appendChild(figureElement);
        cardElement.appendChild(contenidoElement);

        propiedadElement.appendChild(cardElement);

        return propiedadElement;
    }
});
