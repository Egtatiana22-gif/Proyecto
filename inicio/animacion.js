// ==================== BOTÓN CONOCE MÁS ====================

const boton = document.getElementById("btnBienvenida");

boton.addEventListener("click", function() {
    window.location.href = "../nosotros/nosotros.html";
});

// ==================== BOTÓN VER MÁS - FAVORITOS ====================

const btnVerMas = document.getElementById("btnVerMas");
const productosExtra = document.getElementById("productosExtra");

btnVerMas.addEventListener("click", function() {
    if (!productosExtra.classList.contains("mostrar")) {
        productosExtra.classList.add("mostrar");
        btnVerMas.textContent = "Ir al menú";
    } else {
        window.location.href = "../menu/menu.html";
    }
});

// ==================== BOTÓN VER MÁS - TIENDA ====================

const btnVerMasTienda = document.getElementById("btnVerMasTienda");
const productosTiendaExtra = document.getElementById("productosTiendaExtra");

btnVerMasTienda.addEventListener("click", function() {
    if (!productosTiendaExtra.classList.contains("mostrar")) {
        productosTiendaExtra.classList.add("mostrar");
        btnVerMasTienda.textContent = "Ir a la tienda";
    } else {
        window.location.href = "../tienda/tienda.html";
    }
});


/* =========================================
   BOTÓN RESERVACIONES
========================================= */

const fechaEvento = document.getElementById("fechaEvento");
const btnReservaciones = document.getElementById("btnReservaciones");

if (fechaEvento && btnReservaciones) {

    /* Obtener la fecha de hoy */

    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    const fechaHoy = `${año}-${mes}-${dia}`;

    /* No permitir fechas anteriores a hoy */

    fechaEvento.min = fechaHoy;

    /* Crear mensaje de validación */

    let mensajeFecha = document.getElementById("mensajeFecha");

    if (!mensajeFecha) {
        mensajeFecha = document.createElement("small");
        mensajeFecha.id = "mensajeFecha";
        mensajeFecha.style.display = "none";

        fechaEvento.insertAdjacentElement("afterend", mensajeFecha);
    }

    /* Mostrar mensaje */

    function mostrarMensaje(mensaje) {
        mensajeFecha.textContent = mensaje;
        mensajeFecha.style.display = "block";
        mensajeFecha.style.color = "#B54747";
        mensajeFecha.style.fontSize = "13px";
        mensajeFecha.style.marginTop = "8px";
        mensajeFecha.setAttribute("role", "alert");
    }

    /* Ocultar mensaje */

    function ocultarMensaje() {
        mensajeFecha.textContent = "";
        mensajeFecha.style.display = "none";
    }

    /* Comprobar si la fecha es domingo */

    function esDomingo(fecha) {
        const fechaSeleccionada = new Date(fecha + "T12:00:00");
        return fechaSeleccionada.getDay() === 0;
    }

    /* Validar fecha al seleccionarla */

    fechaEvento.addEventListener("change", function () {

        ocultarMensaje();

        if (!fechaEvento.value) {
            return;
        }

        if (fechaEvento.value < fechaHoy) {
            fechaEvento.value = "";
            mostrarMensaje("No puedes seleccionar una fecha anterior a hoy.");
            return;
        }

        if (esDomingo(fechaEvento.value)) {
            fechaEvento.value = "";
            mostrarMensaje("Los domingos no tenemos abierto. Por favor, selecciona otro día!.");
            return;
        }
    });

    /* Botón de reservaciones */

    btnReservaciones.addEventListener("click", function () {

        ocultarMensaje();

        /* Comprobar que haya una fecha */

        if (fechaEvento.value === "") {
            mostrarMensaje("Por favor, selecciona una fecha para continuar.");
            return;
        }

        /* Comprobar que no sea una fecha anterior */

        if (fechaEvento.value < fechaHoy) {
            fechaEvento.value = "";
            mostrarMensaje("No puedes seleccionar una fecha anterior a hoy.");
            return;
        }

        /* Comprobar que no sea domingo */

        if (esDomingo(fechaEvento.value)) {
            fechaEvento.value = "";
            mostrarMensaje("Los domingos no estamos abiertos. Por favor, selecciona otro día.");
            return;
        }

        /* Ir a reservaciones */

        window.location.href =
            "../reservaciones/reservaciones.html?fecha=" +
            fechaEvento.value;

    });

}

/* BOTONES AGREGAR AL CARRITO */

const botonesCarrito =
    document.querySelectorAll(".btn-carrito");


botonesCarrito.forEach(function(boton) {

    const producto =
        boton.closest(".producto") ||
        boton.closest(".producto-tienda");


    if (!producto) {
        return;
    }


    const nombreElemento =
        producto.querySelector("h4");


    if (!nombreElemento) {
        return;
    }


    const nombre =
        nombreElemento.textContent.trim();


    const precioTexto =
        boton.textContent;


    const precio =
        Number(
            precioTexto
                .replace("$", "")
                .replace(/\s/g, "")
                .replace(/\./g, "")
                .replace(",", ".")
        );


    /* COMPROBAR SI YA ESTÁ EN EL CARRITO */

    const productoExistente =
        carrito.find(function(item) {

            return item.nombre === nombre;

        });


    if (productoExistente) {

        boton.textContent =
            "✓ En el carrito";

        boton.style.backgroundColor =
            "#8B6F47";

        boton.dataset.carrito =
            "true";

    }


    /* CLICK */

    boton.addEventListener(
        "click",
        function() {

            const productoExistente =
                carrito.find(function(item) {

                    return item.nombre === nombre;

                });


            /* SI YA ESTÁ, ABRIR CARRITO */

            if (productoExistente) {

                abrirCarrito();

                return;

            }


            /* AGREGAR */

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1

            });


            /* GUARDAR */

            localStorage.setItem(
                "carritoArteYSabor",
                JSON.stringify(carrito)
            );


            /* CAMBIAR BOTÓN */

            boton.textContent =
                "✓ En el carrito";

            boton.style.backgroundColor =
                "#8B6F47";

            boton.dataset.carrito =
                "true";


            /* ACTUALIZAR CARRITO */

            actualizarCarrito();

        }
    );

});