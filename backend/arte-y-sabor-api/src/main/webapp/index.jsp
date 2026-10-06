<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page import="java.util.Locale" %>

<%
    LocalDate fechaActual = LocalDate.now();

    DateTimeFormatter formatoFecha =
        DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy", new Locale("es", "CO"));

    String fechaFormateada = fechaActual.format(formatoFecha);
%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Arte y Sabor | Gestión de reservas</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #F3F1EC;
            color: #4A5A3A;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 30px 20px;
        }

        .contenedor {
            width: 100%;
            max-width: 720px;

            background-color: #FFFFFF;

            border: 1px solid #D8D0C3;
            border-radius: 18px;

            padding: 50px 45px;

            text-align: center;

            box-shadow: 0 6px 20px rgba(74, 90, 58, 0.10);
        }

        .icono {
            width: 72px;
            height: 72px;

            margin: 0 auto 20px;

            display: flex;
            align-items: center;
            justify-content: center;

            background-color: #F1F4EC;
            border: 1px solid #D5DDCC;

            border-radius: 50%;

            font-size: 34px;
        }

        h1 {
            margin: 0;

            color: #4A5A3A;

            font-size: 36px;
            font-weight: 700;
        }

        h2 {
            margin: 10px 0 0;

            color: #6B4F3A;

            font-size: 23px;
            font-weight: 500;
        }

        .descripcion {
            margin: 25px auto 0;

            max-width: 560px;

            color: #6F6257;

            font-size: 16px;
            line-height: 1.6;
        }

        .informacion {
            margin-top: 30px;

            padding: 20px;

            background-color: #F8F7F3;

            border: 1px solid #E1DDD5;
            border-radius: 12px;

            text-align: left;
        }

        .informacion p {
            margin: 8px 0;

            color: #5A4030;

            font-size: 15px;
        }

        .informacion strong {
            color: #4A5A3A;
        }

        .estado {
            margin-top: 25px;

            padding: 16px;

            background-color: #F1F4EC;

            border: 1px solid #D5DDCC;
            border-radius: 10px;

            color: #4A5A3A;

            font-size: 15px;
            font-weight: 600;
        }

        .boton {
            display: inline-block;

            margin-top: 30px;

            padding: 13px 28px;

            background-color: #4A5A3A;
            color: #FFFFFF;

            text-decoration: none;

            border-radius: 9px;

            font-size: 16px;
            font-weight: 600;

            transition: background-color 0.2s ease,
                        transform 0.2s ease;
        }

        .boton:hover {
            background-color: #39472D;

            transform: translateY(-2px);
        }

        .pie {
            margin-top: 28px;

            color: #8B6F47;

            font-size: 13px;
        }

        @media (max-width: 600px) {

            .contenedor {
                padding: 35px 25px;
            }

            h1 {
                font-size: 30px;
            }

            h2 {
                font-size: 20px;
            }
        }
    </style>
</head>

<body>

    <main class="contenedor">

        <div class="icono">
            ☕
        </div>

        <h1>Arte y Sabor</h1>

        <h2>Gestión de reservas</h2>

        <p class="descripcion">
            Bienvenido al módulo de gestión de reservas.
            Desde aquí puedes acceder al sistema encargado
            de consultar y administrar las reservas registradas.
        </p>

        <section class="informacion">

            <p>
                <strong>Módulo:</strong>
                Gestión de reservas
            </p>

            <p>
                <strong>Estado:</strong>
                Sistema conectado correctamente
            </p>

            <p>
                <strong>Fecha de acceso:</strong>
                <%= fechaFormateada %>
            </p>

        </section>

        <div class="estado">
            ✓ Módulo JSP funcionando correctamente
        </div>

        <a
            class="boton"
            href="<%= request.getContextPath() %>/reservas"
        >
            Ver reservas registradas
        </a>

        <p class="pie">
            Arte y Sabor · Sistema de gestión de reservas
        </p>

    </main>

</body>
</html>