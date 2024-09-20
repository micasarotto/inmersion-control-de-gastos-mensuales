let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let indiceGastoModificar = null;

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value.trim();

    // Validación para verificar si los campos están vacíos
    if (!nombreGasto || !descripcionGasto || isNaN(valorGasto) || valorGasto <= 0) {
        alert('Por favor, complete todos los campos con información válida.');
        return; // No continuar si la validación falla
    }

    if (valorGasto > 150) {
        alert('¡El gasto es mayor a US$150!');
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcion = listaDescripcionesGastos[posicion];

        htmlLista += `<li>
                        ${elemento} - ${descripcion} - USD ${valorGasto.toFixed(2)}
                        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                        <button onclick="modificarGasto(${posicion});">Modificar</button>
                      </li>`;

        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    indiceGastoModificar = null;
    document.getElementById('botonFormulario').style.display = 'inline';
    document.getElementById('botonModificar').style.display = 'none';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    indiceGastoModificar = posicion;

    document.getElementById('botonFormulario').style.display = 'none';
    document.getElementById('botonModificar').style.display = 'inline';
}

function confirmarModificacion() {
    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value.trim();

    // Validación para verificar si los campos están vacíos
    if (!nombreGasto || !descripcionGasto || isNaN(valorGasto) || valorGasto <= 0) {
        alert('Por favor, complete todos los campos con información válida.');
        return;
    }

    if (indiceGastoModificar !== null) {
        listaNombresGastos[indiceGastoModificar] = nombreGasto;
        listaValoresGastos[indiceGastoModificar] = valorGasto;
        listaDescripcionesGastos[indiceGastoModificar] = descripcionGasto;

        actualizarListaGastos();
        limpiar();
    }
}