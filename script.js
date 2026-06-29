document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreInput = document.getElementById('nombre');
    const regionSelect = document.getElementById('region');
    const estiloRadios = document.getElementsByName('estilo');
    const biografiaTextarea = document.getElementById('biografia');
    const terminosCheckbox = document.getElementById('terminos');

    limpiarErrores();
    let formularioValido = true;

    // --- VALIDACIÓN ALIAS ---
    if (nombreInput.value.trim() === "") {
        mostrarError(nombreInput, 'error-nombre', '[ERROR: ALIAS_REQUERIDO]');
        formularioValido = false;
    } else if (nombreInput.value.trim().length < 3) {
        mostrarError(nombreInput, 'error-nombre', '[ERROR: MÍNIMO_3_CARACTERES]');
        formularioValido = false;
    }

    // --- VALIDACIÓN SECTOR ---
    if (regionSelect.value === "") {
        mostrarError(regionSelect, 'error-region', '[ERROR: SECTOR_NO_SELECCIONADO]');
        formularioValido = false;
    }

    // --- VALIDACIÓN PROTOCOLO (Radios) ---
    let estiloSeleccionado = "";
    for (const radio of estiloRadios) {
        if (radio.checked) {
            estiloSeleccionado = radio.value;
            break;
        }
    }
    if (estiloSeleccionado === "") {
        document.getElementById('error-estilo').textContent = '[ERROR: PROTOCOLO_REQUERIDO]';
        formularioValido = false;
    }

    // --- VALIDACIÓN MANIFIESTO ---
    if (biografiaTextarea.value.trim() === "") {
        mostrarError(biografiaTextarea, 'error-biografia', '[ERROR: MANIFIESTO_VACÍO]');
        formularioValido = false;
    } else if (biografiaTextarea.value.trim().length < 10) {
        mostrarError(biografiaTextarea, 'error-biografia', '[ERROR: TEXTO_DEMASIADO_CORTO]');
        formularioValido = false;
    }

    // --- VALIDACIÓN TÉRMINOS ---
    if (!terminosCheckbox.checked) {
        document.getElementById('error-terminos').textContent = '[ERROR: DEBES_ACEPTAR_LAS_DIRECTIVAS]';
        formularioValido = false;
    }

    // PROCESAMIENTO SI TODO ES CORRECTO
    if (formularioValido) {
        agregarEntrenadorATabla(
            nombreInput.value.trim(),
            regionSelect.value,
            estiloSeleccionado,
            biografiaTextarea.value.trim()
        );

        document.getElementById('pokemonForm').reset();
    }
});

function mostrarError(elementoInput, idErrorSpan, mensaje) {
    elementoInput.classList.add('input-error');
    document.getElementById(idErrorSpan).textContent = mensaje;
}

function limpiarErrores() {
    const inputsConError = document.querySelectorAll('.input-error');
    inputsConError.forEach(input => input.classList.remove('input-error'));

    const spansError = document.querySelectorAll('.error-message');
    spansError.forEach(span => span.textContent = '');
}

function agregarEntrenadorATabla(nombre, region, estilo, biografia) {
    const tablaBody = document.querySelector('#tablaEntrenadores tbody');
    
    const sinDatosFila = document.getElementById('sin-datos');
    if (sinDatosFila) {
        sinDatosFila.remove();
    }

    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
        <td><strong>${nombre}</strong></td>
        <td style="color: #00f0ff;">${region}</td>
        <td style="letter-spacing: 1px;">${estilo}</td>
        <td style="color: #bbb;">${biografia}</td>
    `;

    nuevaFila.style.opacity = 0;
    tablaBody.appendChild(nuevaFila);
    
    setTimeout(() => {
        nuevaFila.style.transition = "opacity 0.4s ease";
        nuevaFila.style.opacity = 1;
    }, 10);
}