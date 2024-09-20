let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let indiceGastoModificar = null; // Variable para almacenar el índice del gasto a modificar

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value;

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
                        <button onclick="modificarGasto(${posicion});">Modificar</button>
                        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
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
    indiceGastoModificar = null; // Limpiar el índice del gasto a modificar
    document.getElementById('botonFormulario').style.display = 'inline'; // Mostrar botón de agregar
    document.getElementById('botonModificar').style.display = 'none';    // Ocultar botón de confirmar modificación
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function modificarGasto(posicion) {
    // Cargar los datos en los campos de entrada
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    indiceGastoModificar = posicion; // Guardar el índice del gasto a modificar

    // Ocultar el botón de agregar y mostrar el de confirmar modificación
    document.getElementById('botonFormulario').style.display = 'none';
    document.getElementById('botonModificar').style.display = 'inline';
}

function confirmarModificacion() {
    if (indiceGastoModificar !== null) {
        // Actualizar los valores del gasto en las listas
        listaNombresGastos[indiceGastoModificar] = document.getElementById('nombreGasto').value;
        listaValoresGastos[indiceGastoModificar] = parseFloat(document.getElementById('valorGasto').value);
        listaDescripcionesGastos[indiceGastoModificar] = document.getElementById('descripcionGasto').value;

        // Actualizar la lista de gastos visualmente
        actualizarListaGastos();
        limpiar(); // Limpiar los campos y restablecer los botones
    }
}