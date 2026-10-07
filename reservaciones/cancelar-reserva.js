/* =========================================================
   CONFIGURACIÓN
========================================================= */

const API_URL =
    "http://localhost:8080/arte-y-sabor-api/reservas";

const LIMITE_NOMBRE = 50;
const LIMITE_CORREO = 100;
const LIMITE_TELEFONO = 10;
const LIMITE_MOTIVO = 1000;


/* =========================================================
   ELEMENTOS
========================================================= */

const btnConsultar =
    document.getElementById("btn-consultar");

const btnMostrarCancelar =
    document.getElementById("btn-mostrar-cancelar");

const consultaReserva =
    document.getElementById("consulta-reserva");

const cancelacionReserva =
    document.getElementById("cancelacion-reserva");

const formularioConsulta =
    document.getElementById("formulario-consulta");

const formularioCancelacion =
    document.getElementById("formulario-cancelacion");

const btnCambiarReserva =
    document.getElementById("btn-cambiar-reserva");

const btnModificarReserva =
    document.getElementById("btn-modificar-reserva");

const btnCancelarFormulario = document.getElementById("btn-cancelar-formulario");

const formularioModificar =
    document.getElementById("formulario-modificar");
formularioModificar.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!reservaParaModificar) {
        console.log("NO HAY RESERVA PARA MODIFICAR");
        return;
    }

    const datos = new URLSearchParams();

    datos.append("accion", "modificar");
    datos.append("idReserva", reservaParaModificar.idReserva);

    datos.append(
        "nombre",
        document.getElementById("nombre-modificar").value.trim()
    );

    datos.append(
        "telefono",
        document.getElementById("telefono-modificar").value.trim()
    );

    datos.append(
        "correo",
        document.getElementById("correo-modificar").value.trim()
    );

    datos.append(
        "personas",
        document.getElementById("personas-modificar").value
    );

    datos.append(
        "fecha",
        document.getElementById("fecha-modificar").value
    );

    datos.append(
        "hora",
        document.getElementById("hora-modificar").value
    );

    datos.append(
        "experiencia",
        document.getElementById("experiencia-modificar").value
    );

    datos.append(
        "mensaje",
        document.getElementById("mensaje-modificar").value.trim()
    );

    try {

        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: datos.toString()
        });

        const resultado = await respuesta.json();

        console.log("RESPUESTA MODIFICAR:", resultado);

        if (resultado.actualizada) {

            console.log("RESERVA MODIFICADA CORRECTAMENTE");

            reservaParaModificar = {
                ...reservaParaModificar,
                nombre: document.getElementById("nombre-modificar").value.trim(),
                telefono: document.getElementById("telefono-modificar").value.trim(),
                correo: document.getElementById("correo-modificar").value.trim(),
                personas: document.getElementById("personas-modificar").value,
                fecha: document.getElementById("fecha-modificar").value,
                hora: document.getElementById("hora-modificar").value,
                experiencia: document.getElementById("experiencia-modificar").value,
                mensaje: document.getElementById("mensaje-modificar").value.trim()
            };

            mostrarModal(modalModificacion);

        } else {

            console.log(
                "NO SE PUDO MODIFICAR:",
                resultado
            );

            alert(
                resultado.mensaje ||
                "No fue posible modificar la reserva."
            );
        }

    } catch (error) {

        console.error(
            "ERROR AL MODIFICAR LA RESERVA:",
            error
        );

        alert(
            "No fue posible comunicarse con el servidor."
        );
    }
});

const seccionModificar =
    document.getElementById("modificar-reserva");

const btnCancelarModificacion = 
    document.getElementById("btn-cancelar-modificacion");

if (btnCancelarModificacion) {
    btnCancelarModificacion.addEventListener("click", function () {
        seccionModificar.classList.add("oculto");
        formularioModificar.reset();

        reservaParaModificar = null;

        console.log("MODIFICACIÓN CANCELADA");
    });
}
if (btnCancelarFormulario) {
    btnCancelarFormulario.addEventListener("click", function () {

        cancelacionReserva.classList.add("oculto");

        if (formularioCancelacion) {
            formularioCancelacion.reset();
        }

        console.log("CANCELACIÓN CANCELADA");
    });
}
/* =========================================================
   CAMPOS DE CONSULTA
========================================================= */

const nombreConsulta =
    document.getElementById("nombre-consulta");

const correoConsulta =
    document.getElementById("correo-consulta");

const telefonoConsulta =
    document.getElementById("telefono-consulta");


/* =========================================================
   CAMPOS DE CANCELACIÓN
========================================================= */

const nombreCancelacion =
    document.getElementById("nombre-cancelacion");

const correoCancelacion =
    document.getElementById("correo-cancelacion");

const telefonoCancelacion =
    document.getElementById("telefono-cancelacion");

const motivo =
    document.getElementById("motivo");

const comentario =
    document.getElementById("comentario");


/* =========================================================
   MODAL CONSULTA
========================================================= */

const modalConsulta =
    document.getElementById("modal-consulta");

const btnCerrarConsulta =
    document.getElementById("cerrar-consulta");

const btnAceptarConsulta =
    document.getElementById("aceptar-consulta");

const resumenConsulta =
    document.getElementById("mensaje-consulta");


/* =========================================================
   MODAL CANCELACIÓN FINAL
========================================================= */

const modalCancelacion =
    document.getElementById("modal-cancelacion");

const btnCerrarCancelacion =
    document.getElementById("cerrar-cancelacion");

const btnConfirmarCancelacion =
    document.getElementById("confirmar-cancelacion");

const btnCancelarConfirmacion =
    document.getElementById("cancelar-confirmacion");

const resumenCancelacion =
    document.getElementById("resumen-cancelacion");


/* =========================================================
   MODAL SISTEMA
========================================================= */

const modalSistema =
    document.getElementById("modal-sistema");

const btnCerrarModalSistema =
    document.getElementById("cerrar-modal-sistema");

const btnAceptarModalSistema =
    document.getElementById("aceptar-modal-sistema");


/* =========================================================
   MODAL NO ENCONTRADA
========================================================= */

const modalNoEncontrada =
    document.getElementById("modal-no-encontrada");

const btnCerrarModalNoEncontrada =
    document.getElementById("cerrar-modal-no-encontrada");

const btnAceptarModalNoEncontrada =
    document.getElementById("aceptar-modal-no-encontrada");

const modalModificacion = document.getElementById("modal-modificacion");
const btnCerrarModalModificacion = document.getElementById("cerrar-modal-modificacion");
const btnAceptarModalModificacion = document.getElementById("aceptar-modal-modificacion");
/* =========================================================
   VOLVER
========================================================= */

const volverReservas =
    document.getElementById("volver-reservas");


/* =========================================================
   ESTADO DE CANCELACIÓN
========================================================= */

let reservasEncontradas = [];

let reservaSeleccionada = null;

let reservaParaModificar = null;

function cargarDatosModificacion(reserva) {
    document.getElementById("nombre-modificar").value = reserva.nombre || "";
    document.getElementById("correo-modificar").value = reserva.correo || "";
    document.getElementById("telefono-modificar").value = reserva.telefono || "";
    document.getElementById("personas-modificar").value = reserva.personas || "";
    document.getElementById("fecha-modificar").value = reserva.fecha || "";
    document.getElementById("hora-modificar").value = reserva.hora || "";
    document.getElementById("experiencia-modificar").value = reserva.experiencia || "";
    document.getElementById("mensaje-modificar").value = reserva.mensaje || "";
}

/* =========================================================
   MENSAJES
========================================================= */

function mostrarMensaje(
    formulario,
    mensaje,
    tipo = "error"
) {

    if (!formulario) {
        return;
    }

    let elemento =
        formulario.querySelector(
            ".mensaje-formulario"
        );

    if (!elemento) {

        elemento =
            document.createElement("div");

        elemento.className =
            "mensaje-formulario";

        formulario.prepend(
            elemento
        );
    }

    elemento.textContent =
        mensaje;

    elemento.className =
        `mensaje-formulario mensaje-${tipo}`;

    elemento.style.display =
        "block";
}


function ocultarMensaje(
    formulario
) {

    if (!formulario) {
        return;
    }

    const elemento =
        formulario.querySelector(
            ".mensaje-formulario"
        );

    if (elemento) {

        elemento.style.display =
            "none";

        elemento.textContent =
            "";
    }
}


/* =========================================================
   MODALES GENERALES
========================================================= */

function mostrarModal(modal) {

    if (modal) {

        modal.classList.add(
            "mostrar"
        );

    }
}


function cerrarModal(modal) {

    if (modal) {

        modal.classList.remove(
            "mostrar"
        );

    }
}


/* =========================================================
   MODAL SISTEMA
========================================================= */

function mostrarModalSistemaNoDisponible() {

    mostrarModal(
        modalSistema
    );
}


function cerrarModalSistemaNoDisponible() {

    cerrarModal(
        modalSistema
    );
}


/* =========================================================
   MODAL NO ENCONTRADA
========================================================= */

function mostrarModalNoEncontrada() {

    mostrarModal(
        modalNoEncontrada
    );
}


function cerrarModalNoEncontrada() {

    cerrarModal(
        modalNoEncontrada
    );
}


/* =========================================================
   VALIDACIÓN VISUAL
========================================================= */

function marcarError(
    campo,
    mensaje
) {

    if (!campo) {
        return;
    }

    campo.classList.add(
        "campo-error"
    );

    let mensajeError =
        campo.parentElement?.querySelector(
            ".mensaje-campo"
        );

    if (!mensajeError) {

        mensajeError =
            document.createElement("small");

        mensajeError.className =
            "mensaje-campo";

        campo.parentElement?.appendChild(
            mensajeError
        );
    }

    if (mensajeError) {

        mensajeError.textContent =
            mensaje;
    }
}


function quitarError(
    campo
) {

    if (!campo) {
        return;
    }

    campo.classList.remove(
        "campo-error"
    );

    const mensajeError =
        campo.parentElement?.querySelector(
            ".mensaje-campo"
        );

    if (mensajeError) {

        mensajeError.remove();
    }
}


/* =========================================================
   LIMPIAR TELÉFONO
========================================================= */

function limpiarTelefono(
    campo
) {

    if (!campo) {
        return;
    }

    campo.value =
        campo.value
            .replace(/\D/g, "")
            .slice(
                0,
                LIMITE_TELEFONO
            );
}


/* =========================================================
   VALIDAR CONTACTO
========================================================= */

function validarContacto(
    nombre,
    correo,
    telefono,
    formulario
) {

    let valido = true;

    ocultarMensaje(
        formulario
    );

    quitarError(nombre);
    quitarError(correo);
    quitarError(telefono);


    /* ---------- NOMBRE ---------- */

    const nombreLimpio =
        nombre?.value.trim() || "";

    if (!nombreLimpio) {

        marcarError(
            nombre,
            "Ingresa tu nombre completo."
        );

        valido = false;

    } else if (
        nombreLimpio.length >
        LIMITE_NOMBRE
    ) {

        marcarError(
            nombre,
            `El nombre no puede superar los ${LIMITE_NOMBRE} caracteres.`
        );

        valido = false;

    } else if (
        !/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(
            nombreLimpio
        )
    ) {

        marcarError(
            nombre,
            "El nombre solo puede contener letras y espacios."
        );

        valido = false;
    }


    /* ---------- CONTACTO ---------- */

    const correoLimpio =
        correo?.value.trim() || "";

    const telefonoLimpio =
        telefono?.value.trim() || "";


    if (
        !correoLimpio &&
        !telefonoLimpio
    ) {

        marcarError(
            correo || telefono,
            "Ingresa tu correo electrónico o tu número de teléfono."
        );

        valido = false;

    } else if (
        correoLimpio
    ) {

        if (
            correoLimpio.length >
            LIMITE_CORREO
        ) {

            marcarError(
                correo,
                `El correo no puede superar los ${LIMITE_CORREO} caracteres.`
            );

            valido = false;

        } else if (
            correo &&
            !correo.validity.valid
        ) {

            marcarError(
                correo,
                "Ingresa un correo electrónico válido."
            );

            valido = false;
        }

    } else if (
        telefonoLimpio
    ) {

        if (
            !/^3\d{9}$/.test(
                telefonoLimpio
            )
        ) {

            marcarError(
                telefono,
                "El teléfono debe tener 10 dígitos y comenzar por 3."
            );

            valido = false;
        }
    }


    return valido;
}


/* =========================================================
   MOSTRAR SECCIÓN CONSULTA
========================================================= */

if (btnConsultar) {

    btnConsultar.addEventListener(
        "click",
        () => {

            if (consultaReserva) {

                consultaReserva.classList.remove(
                    "oculto"
                );
            }

            if (cancelacionReserva) {

                cancelacionReserva.classList.add(
                    "oculto"
                );
            }

            consultaReserva?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );
}


/* =========================================================
   MOSTRAR SECCIÓN CANCELACIÓN
========================================================= */

if (btnMostrarCancelar) {

    btnMostrarCancelar.addEventListener(
        "click",
        () => {

            if (cancelacionReserva) {

                cancelacionReserva.classList.remove(
                    "oculto"
                );
            }

            if (consultaReserva) {

                consultaReserva.classList.add(
                    "oculto"
                );
            }

            cancelacionReserva?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );
}


/* =========================================================
   TELÉFONOS
========================================================= */

if (telefonoConsulta) {

    telefonoConsulta.addEventListener(
        "input",
        () => {

            limpiarTelefono(
                telefonoConsulta
            );

            quitarError(
                telefonoConsulta
            );

        }
    );
}


if (telefonoCancelacion) {

    telefonoCancelacion.addEventListener(
        "input",
        () => {

            limpiarTelefono(
                telefonoCancelacion
            );

            quitarError(
                telefonoCancelacion
            );

        }
    );
}


/* =========================================================
   LIMITAR CARACTERES
========================================================= */

function limitarCaracteres(
    campo,
    limite
) {

    if (!campo) {
        return;
    }

    campo.addEventListener(
        "input",
        () => {

            if (
                campo.value.length >
                limite
            ) {

                campo.value =
                    campo.value.slice(
                        0,
                        limite
                    );
            }

        }
    );
}


limitarCaracteres(
    nombreConsulta,
    LIMITE_NOMBRE
);

limitarCaracteres(
    nombreCancelacion,
    LIMITE_NOMBRE
);

limitarCaracteres(
    correoConsulta,
    LIMITE_CORREO
);

limitarCaracteres(
    correoCancelacion,
    LIMITE_CORREO
);

limitarCaracteres(
    comentario,
    LIMITE_MOTIVO
);


/* =========================================================
   CONSULTAR RESERVA
========================================================= */

if (formularioConsulta) {

    formularioConsulta.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const valido =
                validarContacto(
                    nombreConsulta,
                    correoConsulta,
                    telefonoConsulta,
                    formularioConsulta
                );


            if (!valido) {
                return;
            }


            const nombre =
                nombreConsulta.value.trim();

            const correo =
                correoConsulta.value.trim();

            const telefono =
                telefonoConsulta.value.trim();


            const parametros =
                new URLSearchParams();


            parametros.append(
                "accion",
                "consultar"
            );

            parametros.append(
                "nombre",
                nombre
            );


            if (correo) {

                parametros.append(
                    "correo",
                    correo
                );

            } else {

                parametros.append(
                    "telefono",
                    telefono
                );
            }


            mostrarMensaje(
                formularioConsulta,
                "Consultando tu reserva...",
                "info"
            );


            try {

                const respuesta =
                    await fetch(
                        `${API_URL}?${parametros.toString()}`
                    );


                if (
                    respuesta.status === 503
                ) {

                    ocultarMensaje(
                        formularioConsulta
                    );

                    mostrarModalSistemaNoDisponible();

                    return;
                }


                if (!respuesta.ok) {

                    mostrarMensaje(
                        formularioConsulta,
                        "Ocurrió un problema al consultar la reserva. Intenta nuevamente.",
                        "error"
                    );

                    return;
                }


                const datos =
                    await respuesta.json();


                if (
                    datos.error ===
                    "base_datos"
                ) {

                    ocultarMensaje(
                        formularioConsulta
                    );

                    mostrarModalSistemaNoDisponible();

                    return;
                }


                if (
                    !datos.encontrada ||
                    !Array.isArray(datos.reservas) ||
                    datos.reservas.length === 0
                ) {

                    ocultarMensaje(
                        formularioConsulta
                    );

                    mostrarModalNoEncontrada();

                    return;
                }


                ocultarMensaje(
                    formularioConsulta
                );


                mostrarReservas(
                    datos.reservas
                );

            }

            catch (error) {

                console.error(
                    "Error al consultar reserva:",
                    error
                );

                ocultarMensaje(
                    formularioConsulta
                );

                mostrarModalSistemaNoDisponible();
            }

        }
    );
}


/* =========================================================
   MOSTRAR RESERVAS DE CONSULTA
========================================================= */

function mostrarReservas(
    reservas
) {

    if (!resumenConsulta) {
        return;
    }


    resumenConsulta.innerHTML =
        "";
    reservaParaModificar =
    reservas.length === 1
        ? reservas[0]
        : null;
    
    const titulo =
        document.createElement("p");

    titulo.textContent =
        reservas.length === 1
            ? "Encontramos tu reserva:"
            : `Encontramos ${reservas.length} reservas:`;


    resumenConsulta.appendChild(
        titulo
    );


    reservas.forEach(
        (reserva, indice) => {

            const bloque =
                document.createElement("div");

            bloque.className =
                "reserva-consultada";


            const tituloReserva =
                document.createElement("h3");

            tituloReserva.textContent =
                reservas.length > 1
                    ? `Reserva ${indice + 1}`
                    : "Datos de la reserva";


            const nombre =
                document.createElement("p");

            nombre.textContent =
                `Nombre: ${reserva.nombre}`;


            const telefono =
                document.createElement("p");

            telefono.textContent =
                `Teléfono: ${reserva.telefono}`;


            const correo =
                document.createElement("p");

            correo.textContent =
                `Correo: ${reserva.correo}`;


            const personas =
                document.createElement("p");

            personas.textContent =
                `Personas: ${reserva.personas}`;


            const fecha =
                document.createElement("p");

            fecha.textContent =
                `Fecha: ${reserva.fecha}`;


            const hora =
                document.createElement("p");

            hora.textContent =
                `Hora: ${reserva.hora}`;


            const experiencia =
                document.createElement("p");

            experiencia.textContent =
                `Experiencia: ${reserva.experiencia}`;


            const mensaje =
                document.createElement("p");

            mensaje.textContent =
                reserva.mensaje
                    ? `Mensaje: ${reserva.mensaje}`
                    : "Mensaje: Sin comentarios";


            const estado =
                document.createElement("p");

            estado.textContent =
                `Estado: ${reserva.estado}`;


            bloque.appendChild(
                tituloReserva
            );

            bloque.appendChild(
                nombre
            );

            bloque.appendChild(
                telefono
            );

            bloque.appendChild(
                correo
            );

            bloque.appendChild(
                personas
            );

            bloque.appendChild(
                fecha
            );

            bloque.appendChild(
                hora
            );

            bloque.appendChild(
                experiencia
            );

            bloque.appendChild(
                mensaje
            );

            bloque.appendChild(
                estado
            );


            resumenConsulta.appendChild(
                bloque
            );

        }
    );


    mostrarModal(
        modalConsulta
    );
}


/* =========================================================
   BUSCAR RESERVAS PARA CANCELAR
========================================================= */

async function buscarReservasParaCancelar() {

    /*
       REINICIAR SELECCIÓN AL HACER
       UNA NUEVA BÚSQUEDA
    */

    reservaSeleccionada = null;

    reservasEncontradas = [];


    const datosCancelacion =
        document.getElementById(
            "datos-cancelacion"
        );


    if (datosCancelacion) {

        datosCancelacion.classList.add(
            "oculto"
        );
    }


    const tituloReservaSeleccionada =
        document.getElementById(
            "titulo-reserva-seleccionada"
        );


    if (tituloReservaSeleccionada) {

        tituloReservaSeleccionada.textContent =
            "";
    }


    const detalleReserva =
        document.getElementById(
            "detalle-reserva-seleccionada"
        );


    if (detalleReserva) {

        detalleReserva.innerHTML =
            "";
    }


    ocultarMensaje(
        formularioCancelacion
    );


    const valido =
        validarContacto(
            nombreCancelacion,
            correoCancelacion,
            telefonoCancelacion,
            formularioCancelacion
        );


    if (!valido) {
        return;
    }


    const nombre =
        nombreCancelacion.value.trim();

    const correo =
        correoCancelacion.value.trim();

    const telefono =
        telefonoCancelacion.value.trim();


    const parametros =
        new URLSearchParams();


    parametros.append(
        "accion",
        "consultar"
    );

    parametros.append(
        "nombre",
        nombre
    );


    if (correo) {

        parametros.append(
            "correo",
            correo
        );

    } else {

        parametros.append(
            "telefono",
            telefono
        );
    }


    mostrarMensaje(
        formularioCancelacion,
        "Buscando tus reservas...",
        "info"
    );


    try {

        const respuesta =
            await fetch(
                `${API_URL}?${parametros.toString()}`
            );


        if (
            respuesta.status === 503
        ) {

            ocultarMensaje(
                formularioCancelacion
            );

            mostrarModalSistemaNoDisponible();

            return;
        }


        if (!respuesta.ok) {

            mostrarMensaje(
                formularioCancelacion,
                "Ocurrió un problema al buscar tus reservas. Intenta nuevamente.",
                "error"
            );

            return;
        }


        const datos =
            await respuesta.json();


        if (
            datos.error ===
            "base_datos"
        ) {

            ocultarMensaje(
                formularioCancelacion
            );

            mostrarModalSistemaNoDisponible();

            return;
        }


        if (
            !datos.encontrada ||
            !Array.isArray(datos.reservas) ||
            datos.reservas.length === 0
        ) {

            ocultarMensaje(
                formularioCancelacion
            );

            mostrarModalNoEncontrada();

            return;
        }


        const reservasActivas =
            datos.reservas.filter(
                reserva =>
                    String(
                        reserva.estado || ""
                    ).toUpperCase() === "ACTIVA"
            );


        if (
            reservasActivas.length === 0
        ) {

            mostrarMensaje(
                formularioCancelacion,
                "Encontramos tus reservas, pero ninguna está activa y disponible para cancelar.",
                "error"
            );

            return;
        }


        ocultarMensaje(
            formularioCancelacion
        );


        reservasEncontradas =
            reservasActivas;

        reservaSeleccionada =
            null;


        mostrarModalSeleccionCancelacion(
            reservasActivas
        );

    }

    catch (error) {

        console.error(
            "Error al buscar reservas para cancelar:",
            error
        );

        ocultarMensaje(
            formularioCancelacion
        );

        mostrarModalSistemaNoDisponible();
    }
}


/* =========================================================
   FORMULARIO DE CANCELACIÓN
========================================================= */

if (formularioCancelacion) {

    formularioCancelacion.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /*
               BUSCAR MIS RESERVAS

               Este botón siempre hace
               una nueva búsqueda.
            */

            if (
                event.submitter &&
                event.submitter.id ===
                "btn-buscar-cancelacion"
            ) {

                await buscarReservasParaCancelar();

                return;
            }


            /*
               SI NO HAY RESERVA SELECCIONADA:
               BUSCAMOS LAS RESERVAS.
            */

            if (!reservaSeleccionada) {

                await buscarReservasParaCancelar();

                return;
            }


            /*
               SI YA HAY UNA RESERVA SELECCIONADA:
               VALIDAMOS EL MOTIVO.
            */

            ocultarMensaje(
                formularioCancelacion
            );


            const motivoSeleccionado =
                motivo?.value.trim() || "";


            if (!motivoSeleccionado) {

                marcarError(
                    motivo,
                    "Selecciona un motivo de cancelación."
                );

                return;
            }


            const comentarioTexto =
                comentario?.value.trim() || "";


            /*
               "OTRO" REQUIERE COMENTARIO
            */

            if (
                motivoSeleccionado === "Otro" &&
                !comentarioTexto
            ) {

                marcarError(
                    comentario,
                    "Cuando seleccionas “Otro”, debes explicar el motivo."
                );

                return;
            }


            if (
                comentarioTexto.length >
                LIMITE_MOTIVO
            ) {

                marcarError(
                    comentario,
                    `El comentario no puede superar los ${LIMITE_MOTIVO} caracteres.`
                );

                return;
            }


            /*
               MOSTRAR CONFIRMACIÓN
            */

            mostrarResumenCancelacion(
                reservaSeleccionada,
                motivoSeleccionado,
                comentarioTexto
            );


            mostrarModal(
                modalCancelacion
            );

        }
    );
}


/* =========================================================
   CAMBIAR RESERVA
========================================================= */

if (btnCambiarReserva) {

    btnCambiarReserva.addEventListener(
        "click",
        () => {

            if (
                reservasEncontradas &&
                reservasEncontradas.length > 0
            ) {

                mostrarModalSeleccionCancelacion(
                    reservasEncontradas
                );

                return;
            }


            reservaSeleccionada =
                null;
        }
    );
}


/* =========================================================
   MODAL PARA SELECCIONAR RESERVA
========================================================= */

function mostrarModalSeleccionCancelacion(
    reservas
) {

    const modalAnterior =
        document.getElementById(
            "modal-seleccion-cancelacion"
        );


    if (modalAnterior) {

        modalAnterior.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "modal-seleccion-cancelacion";

    modal.className =
        "modal-seleccion-cancelacion mostrar";


    const contenido =
        document.createElement("div");

    contenido.className =
        "contenido-seleccion-cancelacion";


    const titulo =
        document.createElement("h2");

    titulo.className =
        "titulo-seleccion-cancelacion";

    titulo.textContent =
        "Selecciona la reserva que deseas cancelar";


    const texto =
        document.createElement("p");

    texto.className =
        "texto-seleccion-cancelacion";

    texto.textContent =
        "Encontramos estas reservas activas con tus datos. Selecciona la que deseas cancelar.";


    const lista =
        document.createElement("div");

    lista.className =
        "lista-modal-cancelacion";


    let reservaTemporal =
        null;


    reservas.forEach(
        (reserva, indice) => {

            const tarjeta =
                document.createElement("label");

            tarjeta.className =
                "reserva-modal-cancelacion";


            const radio =
                document.createElement("input");

            radio.type =
                "radio";

            radio.name =
                "reserva-modal-seleccion";

            radio.value =
                String(
                    reserva.idReserva
                );


            const informacion =
                document.createElement("div");

            informacion.className =
                "info-modal-cancelacion";


            const tituloReserva =
                document.createElement("strong");

            tituloReserva.textContent =
                `Reserva ${indice + 1}`;


            const fecha =
                document.createElement("p");

            fecha.textContent =
                `Fecha: ${reserva.fecha}`;


            const hora =
                document.createElement("p");

            hora.textContent =
                `Hora: ${reserva.hora}`;


            const experiencia =
                document.createElement("p");

            experiencia.textContent =
                `Experiencia: ${reserva.experiencia}`;


            const personas =
                document.createElement("p");

            personas.textContent =
                `Personas: ${reserva.personas}`;


            informacion.appendChild(
                tituloReserva
            );

            informacion.appendChild(
                fecha
            );

            informacion.appendChild(
                hora
            );

            informacion.appendChild(
                experiencia
            );

            informacion.appendChild(
                personas
            );


            tarjeta.appendChild(
                radio
            );

            tarjeta.appendChild(
                informacion
            );


            radio.addEventListener(
                "change",
                () => {

                    reservaTemporal =
                        reserva;
                }
            );


            lista.appendChild(
                tarjeta
            );

        }
    );


    const botones =
        document.createElement("div");

    botones.className =
        "botones-modal-cancelacion";


    const botonCerrar =
        document.createElement("button");

    botonCerrar.type =
        "button";

    botonCerrar.className =
        "btn-modal-cancelacion cerrar";

    botonCerrar.textContent =
        "Cerrar";


    const botonContinuar =
        document.createElement("button");

    botonContinuar.type =
        "button";

    botonContinuar.className =
        "btn-modal-cancelacion continuar";

    botonContinuar.textContent =
        "Continuar";


    botonCerrar.addEventListener(
        "click",
        () => {

            modal.remove();
        }
    );


    botonContinuar.addEventListener(
        "click",
        () => {

            if (!reservaTemporal) {

                let aviso =
                    contenido.querySelector(
                        ".aviso-seleccion-cancelacion"
                    );


                if (!aviso) {

                    aviso =
                        document.createElement("p");

                    aviso.className =
                        "aviso-seleccion-cancelacion";

                    aviso.textContent =
                        "Selecciona una reserva para continuar.";

                    aviso.style.marginTop =
                        "15px";

                    aviso.style.textAlign =
                        "center";

                    aviso.style.color =
                        "#a33";


                    contenido.appendChild(
                        aviso
                    );
                }

                return;
            }


            /*
               GUARDAR RESERVA SELECCIONADA
            */

            reservaSeleccionada =
                reservaTemporal;


            /*
               MOSTRAR RESERVA SELECCIONADA
            */

            const tituloReservaSeleccionada =
                document.getElementById(
                    "titulo-reserva-seleccionada"
                );


            if (tituloReservaSeleccionada) {

                let fechaFormateada =
                    reservaSeleccionada.fecha;


                if (
                    reservaSeleccionada.fecha
                ) {

                    const fecha =
                        new Date(
                            reservaSeleccionada.fecha +
                            "T00:00:00"
                        );


                    fechaFormateada =
                        new Intl.DateTimeFormat(
                            "es-CO",
                            {
                                day: "numeric",
                                month: "long"
                            }
                        ).format(
                            fecha
                        );
                }


                tituloReservaSeleccionada.textContent =
                    `Reserva del ${fechaFormateada} · ${reservaSeleccionada.experiencia} · ${reservaSeleccionada.hora}`;
            }


            /*
               CERRAR MODAL
            */

            modal.remove();


            /*
               LIMPIAR MOTIVO Y COMENTARIO
            */

            if (motivo) {

                motivo.value =
                    "";
            }


            if (comentario) {

                comentario.value =
                    "";
            }


            quitarError(
                motivo
            );

            quitarError(
                comentario
            );


            /*
               MOSTRAR DATOS DE CANCELACIÓN
            */

            const datosCancelacion =
                document.getElementById(
                    "datos-cancelacion"
                );


            if (datosCancelacion) {

                datosCancelacion.classList.remove(
                    "oculto"
                );

                datosCancelacion.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        }
    );


    botones.appendChild(
        botonCerrar
    );

    botones.appendChild(
        botonContinuar
    );


    contenido.appendChild(
        titulo
    );

    contenido.appendChild(
        texto
    );

    contenido.appendChild(
        lista
    );

    contenido.appendChild(
        botones
    );


    modal.appendChild(
        contenido
    );


    /*
       CERRAR AL HACER CLIC FUERA
    */

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                modal.remove();
            }
        }
    );


    document.body.appendChild(
        modal
    );
}


/* =========================================================
   MOSTRAR RESUMEN DE CANCELACIÓN
========================================================= */

function mostrarResumenCancelacion(
    reserva,
    motivoTexto,
    comentarioTexto
) {

    if (!resumenCancelacion) {
        return;
    }


    resumenCancelacion.innerHTML =
        "";


    const titulo =
        document.createElement("h3");

    titulo.textContent =
        "Reserva seleccionada";


    const nombre =
        document.createElement("p");

    nombre.textContent =
        `Nombre: ${reserva.nombre}`;


    const correo =
        document.createElement("p");

    correo.textContent =
        `Correo: ${reserva.correo}`;


    const telefono =
        document.createElement("p");

    telefono.textContent =
        `Teléfono: ${reserva.telefono}`;


    const fecha =
        document.createElement("p");

    fecha.textContent =
        `Fecha: ${reserva.fecha}`;


    const hora =
        document.createElement("p");

    hora.textContent =
        `Hora: ${reserva.hora}`;


    const personas =
        document.createElement("p");

    personas.textContent =
        `Personas: ${reserva.personas}`;


    const experiencia =
        document.createElement("p");

    experiencia.textContent =
        `Experiencia: ${reserva.experiencia}`;


    const motivoElemento =
        document.createElement("p");

    motivoElemento.textContent =
        `Motivo: ${motivoTexto}`;


    resumenCancelacion.appendChild(
        titulo
    );

    resumenCancelacion.appendChild(
        nombre
    );

    resumenCancelacion.appendChild(
        correo
    );

    resumenCancelacion.appendChild(
        telefono
    );

    resumenCancelacion.appendChild(
        fecha
    );

    resumenCancelacion.appendChild(
        hora
    );

    resumenCancelacion.appendChild(
        personas
    );

    resumenCancelacion.appendChild(
        experiencia
    );

    resumenCancelacion.appendChild(
        motivoElemento
    );


    if (comentarioTexto) {

        const comentarioElemento =
            document.createElement("p");

        comentarioElemento.textContent =
            `Comentario: ${comentarioTexto}`;


        resumenCancelacion.appendChild(
            comentarioElemento
        );
    }
}


/* =========================================================
   CONFIRMAR CANCELACIÓN
========================================================= */

if (btnConfirmarCancelacion) {

    btnConfirmarCancelacion.addEventListener(
        "click",
        async () => {

            if (!reservaSeleccionada) {

                cerrarModal(
                    modalCancelacion
                );

                mostrarMensaje(
                    formularioCancelacion,
                    "No hay una reserva seleccionada.",
                    "error"
                );

                return;
            }


            const idReserva =
                reservaSeleccionada.idReserva;


            if (!idReserva) {

                cerrarModal(
                    modalCancelacion
                );

                mostrarMensaje(
                    formularioCancelacion,
                    "No se pudo identificar la reserva seleccionada.",
                    "error"
                );

                return;
            }


            const motivoTexto =
                motivo?.value.trim() || "";

            const comentarioTexto =
                comentario?.value.trim() || "";


            let motivoFinal =
                motivoTexto;


            if (comentarioTexto) {

                motivoFinal +=
                    ` - ${comentarioTexto}`;
            }


            btnConfirmarCancelacion.disabled =
                true;

            btnConfirmarCancelacion.textContent =
                "Cancelando...";


            try {

                const respuesta =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8"
                            },

                            body:
                                new URLSearchParams({
                                    accion: "cancelar",
                                    idReserva: idReserva,
                                    motivo: motivoFinal
                                })
                        }
                    );


                if (
                    respuesta.status === 503
                ) {

                    cerrarModal(
                        modalCancelacion
                    );

                    mostrarModalSistemaNoDisponible();

                    return;
                }


                if (!respuesta.ok) {

                    cerrarModal(
                        modalCancelacion
                    );

                    mostrarMensaje(
                        formularioCancelacion,
                        "No fue posible cancelar la reserva. Intenta nuevamente.",
                        "error"
                    );

                    return;
                }


                const datos =
                    await respuesta.json();


                if (
                    datos.error ===
                    "base_datos"
                ) {

                    cerrarModal(
                        modalCancelacion
                    );

                    mostrarModalSistemaNoDisponible();

                    return;
                }


                if (!datos.cancelada) {

                    cerrarModal(
                        modalCancelacion
                    );

                    mostrarMensaje(
                        formularioCancelacion,
                        datos.mensaje ||
                        "La reserva no pudo cancelarse.",
                        "error"
                    );

                    return;
                }


                /* =========================================
                   CANCELACIÓN EXITOSA
                ========================================= */

                cerrarModal(
                    modalCancelacion
                );


                /*
                   LIMPIAR ESTADO
                */

                reservaSeleccionada =
                    null;

                reservasEncontradas =
                    [];


                /*
                   LIMPIAR FORMULARIO
                */

                if (formularioCancelacion) {

                    formularioCancelacion.reset();
                }


                /*
                   QUITAR ERRORES VISUALES
                */

                quitarError(
                    nombreCancelacion
                );

                quitarError(
                    correoCancelacion
                );

                quitarError(
                    telefonoCancelacion
                );

                quitarError(
                    motivo
                );

                quitarError(
                    comentario
                );


                /*
                   OCULTAR RESERVA SELECCIONADA
                */

                const datosCancelacion =
                    document.getElementById(
                        "datos-cancelacion"
                    );


                if (datosCancelacion) {

                    datosCancelacion.classList.add(
                        "oculto"
                    );
                }


                /*
                   LIMPIAR TÍTULO
                */

                const tituloReservaSeleccionada =
                    document.getElementById(
                        "titulo-reserva-seleccionada"
                    );


                if (tituloReservaSeleccionada) {

                    tituloReservaSeleccionada.textContent =
                        "";
                }


                /*
                   LIMPIAR DETALLES
                */

                const detalleReserva =
                    document.getElementById(
                        "detalle-reserva-seleccionada"
                    );


                if (detalleReserva) {

                    detalleReserva.innerHTML =
                        "";
                }


                /*
                   LIMPIAR RESUMEN DEL MODAL
                */

                if (resumenCancelacion) {

                    resumenCancelacion.innerHTML =
                        "";
                }


                /*
                   MOSTRAR MENSAJE DE ÉXITO
                */

                mostrarMensaje(
                    formularioCancelacion,
                    "La reserva fue cancelada correctamente. Puedes realizar una nueva búsqueda cuando quieras.",
                    "exito"
                );

            }

            catch (error) {

                console.error(
                    "Error al cancelar reserva:",
                    error
                );

                cerrarModal(
                    modalCancelacion
                );

                mostrarModalSistemaNoDisponible();

            }

            finally {

                btnConfirmarCancelacion.disabled =
                    false;

                btnConfirmarCancelacion.textContent =
                    "Sí, cancelar reserva";
            }

        }
    );
}


/* =========================================================
   CERRAR MODAL FINAL DE CANCELACIÓN
========================================================= */

function cerrarModalCancelacion() {

    cerrarModal(
        modalCancelacion
    );
}


if (btnCerrarCancelacion) {

    btnCerrarCancelacion.addEventListener(
        "click",
        cerrarModalCancelacion
    );
}


if (btnCancelarConfirmacion) {

    btnCancelarConfirmacion.addEventListener(
        "click",
        cerrarModalCancelacion
    );
}


/* =========================================================
   CAMBIO DE MOTIVO
========================================================= */

if (motivo) {

    motivo.addEventListener(
        "change",
        () => {

            quitarError(
                motivo
            );


            const ayuda =
                document.getElementById(
                    "ayuda-comentario-cancelacion"
                );


            if (
                motivo.value ===
                "Otro"
            ) {

                if (ayuda) {

                    ayuda.textContent =
                        "El comentario es obligatorio cuando seleccionas “Otro”.";
                }

            } else {

                if (ayuda) {

                    ayuda.textContent =
                        "Este comentario es opcional.";
                }
            }

        }
    );
}


/* =========================================================
   CERRAR MODAL CONSULTA
========================================================= */

if (btnCerrarConsulta) {

    btnCerrarConsulta.addEventListener(
        "click",
        () => {

            cerrarModal(
                modalConsulta
            );

        }
    );
}


if (btnAceptarConsulta) {

    btnAceptarConsulta.addEventListener(
        "click",
        () => {

            cerrarModal(
                modalConsulta
            );

        }
    );
}
if (btnCerrarModalSistema) {
    btnCerrarModalSistema.addEventListener(
        "click",
        () => {
            cerrarModalSistemaNoDisponible();
        }
    );
}

if (btnAceptarModalSistema) {
    btnAceptarModalSistema.addEventListener(
        "click",
        () => {
            cerrarModalSistemaNoDisponible();
        }
    );
}
if (btnAceptarModalModificacion) {
    btnAceptarModalModificacion.addEventListener("click", function () {

        cerrarModal(modalModificacion);

        if (seccionModificar) {
            seccionModificar.classList.add("oculto");
        }

        if (formularioModificar) {
            formularioModificar.reset();
        }

        reservaParaModificar = null;

        console.log("MODIFICACIÓN FINALIZADA");
    });
}

if (btnCerrarModalModificacion) {
    btnCerrarModalModificacion.addEventListener("click", function () {
        cerrarModal(modalModificacion);
    });
}
if (btnCerrarModalNoEncontrada) {
    btnCerrarModalNoEncontrada.addEventListener(
        "click",
        () => {
            cerrarModalNoEncontrada();
        }
    );
}

if (btnAceptarModalNoEncontrada) {
    btnAceptarModalNoEncontrada.addEventListener(
        "click",
        () => {
            cerrarModalNoEncontrada();
        }
    );
}
/* =========================================================
   MODIFICAR RESERVA
========================================================= */

if (btnModificarReserva) {

    btnModificarReserva.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        
        console.log("BOTÓN MODIFICAR FUNCIONA");
        console.log("DATOS REALES:", reservaParaModificar);

        if (!reservaParaModificar) {
            console.log("NO HAY RESERVA PARA MODIFICAR");
            return;
        }

       cerrarModal(modalConsulta);

        console.log("MODAL CERRADO");

        if (seccionModificar) {

        seccionModificar.classList.remove("oculto");

        console.log("SECCIÓN MODIFICAR MOSTRADA");
        cargarDatosModificacion(reservaParaModificar);

}

    });

}
/* =========================================================
   CERRAR MODALES AL HACER CLIC AFUERA
========================================================= */

window.addEventListener(
    "click",
    (event) => {

        if (
            modalConsulta &&
            event.target === modalConsulta
        ) {

            cerrarModal(
                modalConsulta
            );
        }


        if (
            modalCancelacion &&
            event.target === modalCancelacion
        ) {

            cerrarModal(
                modalCancelacion
            );
        }


        if (
            modalSistema &&
            event.target === modalSistema
        ) {

            cerrarModalSistemaNoDisponible();
        }


        if (
            modalNoEncontrada &&
            event.target === modalNoEncontrada
        ) {

            cerrarModalNoEncontrada();
        }

    }
);


/* =========================================================
   ESC PARA CERRAR MODALES
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !==
            "Escape"
        ) {

            return;
        }


        cerrarModal(
            modalConsulta
        );

        cerrarModal(
            modalCancelacion
        );

        cerrarModalSistemaNoDisponible();

        cerrarModalNoEncontrada();


        const modalSeleccion =
            document.getElementById(
                "modal-seleccion-cancelacion"
            );


        if (modalSeleccion) {

            modalSeleccion.remove();
        }

    }
);


/* =========================================================
   VOLVER A RESERVACIONES
========================================================= */

if (volverReservas) {

    volverReservas.addEventListener(
        "click",
        () => {

            window.location.href =
                "reservaciones.html";

        }
    );
}


/* =========================================================
   LIMPIAR ERRORES AL ESCRIBIR
========================================================= */

[
    nombreConsulta,
    correoConsulta,
    telefonoConsulta,
    nombreCancelacion,
    correoCancelacion,
    telefonoCancelacion,
    motivo,
    comentario

].forEach(
    campo => {

        if (!campo) {
            return;
        }


        campo.addEventListener(
            "input",
            () => {

                quitarError(
                    campo
                );

            }
        );


        campo.addEventListener(
            "change",
            () => {

                quitarError(
                    campo
                );

            }
        );

    }
);