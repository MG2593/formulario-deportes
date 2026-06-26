// Aprendiendo: Cuando el usuario haga clic en "Guardar", esto se activa
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(evento) {
    // Evita que la página se recargue (comportamiento por defecto del formulario)
    evento.preventDefault();

    // 1. CAMBIO: Aquí busco los elementos por sus NUEVOS IDs
    const nombre = document.getElementById("nombre");
    const categoria = document.getElementById("categoria");
    const descripcion = document.getElementById("descripcion");
    const acepto = document.getElementById("acepto");
    const tipo = document.querySelector('input[name="tipo"]:checked');

    // Esta variable me sirve para saber si todo está bien escrito
    let valido = true;

    // --- VALIDACIÓN DEL NOMBRE (antes era "titulo") ---
    // Aprendizaje: .trim() quita espacios al inicio y final. Si está vacío, error.
    if (nombre.value.trim() === "") {
        // Muestro el mensaje de error que está oculto (display:none en CSS)
        document.getElementById("error-nombre").style.display = "block";
        // Pongo un borde rojo al input
        nombre.classList.add("error");
        valido = false; // Marca que hay un error
    } else {
        // Si está bien, oculto el error y quito el borde rojo
        document.getElementById("error-nombre").style.display = "none";
        nombre.classList.remove("error");
    }

    // --- VALIDACIÓN DE LA CATEGORÍA (antes era "genero") ---
    if (categoria.value === "") {
        document.getElementById("error-categoria").style.display = "block";
        categoria.classList.add("error");
        valido = false;
    } else {
        document.getElementById("error-categoria").style.display = "none";
        categoria.classList.remove("error");
    }

    // --- VALIDACIÓN DEL TIPO (RADIOS) ---
    // Si no seleccionó ningún radio, 'tipo' vale null
    if (tipo === null) {
        document.getElementById("error-tipo").style.display = "block";
        document.getElementById("campo-tipo").classList.add("error");
        valido = false;
    } else {
        document.getElementById("error-tipo").style.display = "none";
        document.getElementById("campo-tipo").classList.remove("error");
    }

    // --- VALIDACIÓN DE LA DESCRIPCIÓN (antes era "comentarios") ---
    // Aprendizaje: La lógica sigue igual, mínimo 5 caracteres
    if (descripcion.value.trim().length < 5) {
        document.getElementById("error-descripcion").style.display = "block";
        descripcion.classList.add("error");
        valido = false;
    } else {
        document.getElementById("error-descripcion").style.display = "none";
        descripcion.classList.remove("error");
    }

    // --- VALIDACIÓN DEL CHECKBOX ---
    // .checked devuelve true o false si está marcado
    if (!acepto.checked) {
        document.getElementById("error-acepto").style.display = "block";
        document.getElementById("campo-acepto").classList.add("error");
        valido = false;
    } else {
        document.getElementById("error-acepto").style.display = "none";
        document.getElementById("campo-acepto").classList.remove("error");
    }

    // --- SI TODO ES VÁLIDO, GUARDAMOS EN LA TABLA ---
    if (valido) {
        const tabla = document.getElementById("cuerpo-tabla");
        
        // Eliminar el mensaje de "No hay deportes..." si existe
        const sinRegistros = document.getElementById("sin-registros");
        if (sinRegistros) {
            sinRegistros.remove();
        }

        // Crear una nueva fila (<tr>) en la tabla
        const fila = document.createElement("tr");
        
        // 2. CAMBIO: Aquí metemos los NUEVOS datos en las celdas
        // Ahora insertamos nombre, categoria, tipo y descripcion
        fila.innerHTML = `
            <td>${nombre.value.trim()}</td>
            <td>${categoria.value}</td>
            <td>${tipo.value}</td>
            <td>${descripcion.value.trim()}</td>
        `;
        // Agregamos la fila a la tabla
        tabla.appendChild(fila);

        // LIMPIAR el formulario después de guardar (buena experiencia de usuario)
        formulario.reset();
        // Quitamos todos los bordes rojos y mensajes de error que hayan quedado
        document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        document.querySelectorAll(".texto-error").forEach(el => el.style.display = "none");
    }
});