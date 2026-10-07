package com.arteysabor.servlet;

import com.arteysabor.dao.ReservaDAO;
import com.arteysabor.modelo.Reserva;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/reservas")
public class ReservaServlet extends HttpServlet {

    private final ReservaDAO reservaDAO = new ReservaDAO();

    // GET: listar reservas o consultar una reserva específica
    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String accion =
                request.getParameter("accion");


        /*
         * =====================================================
         * CONSULTAR RESERVAS
         * =====================================================
         */

        if ("consultar".equals(accion)) {

            String nombre =
                    request.getParameter("nombre");

            String correo =
                    request.getParameter("correo");

            String telefono =
                    request.getParameter("telefono");


            response.setHeader(
                    "Access-Control-Allow-Origin",
                    "*"
            );

            response.setContentType(
                    "application/json;charset=UTF-8"
            );

            PrintWriter out =
                    response.getWriter();


            /*
             * -------------------------------------------------
             * VALIDAR NOMBRE
             * -------------------------------------------------
             */

            if (nombre == null
                    || nombre.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"encontrada\":false,\"error\":\"datos_incompletos\"}"
                );

                return;
            }


            /*
             * -------------------------------------------------
             * DEBE EXISTIR CORREO O TELÉFONO
             * -------------------------------------------------
             */

            if (
                    (correo == null
                            || correo.trim().isEmpty())
                    &&
                    (telefono == null
                            || telefono.trim().isEmpty())
            ) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"encontrada\":false,\"error\":\"contacto_requerido\"}"
                );

                return;
            }


            try {

                /*
                 * -------------------------------------------------
                 * BUSCAR POR NOMBRE + CORREO O TELÉFONO
                 * -------------------------------------------------
                 */

                List<Reserva> reservas =
                        reservaDAO.consultarPorContacto(
                                nombre.trim(),
                                correo != null
                                        ? correo.trim()
                                        : "",
                                telefono != null
                                        ? telefono.trim()
                                        : ""
                        );


                /*
                 * -------------------------------------------------
                 * NO ENCONTRADA
                 * -------------------------------------------------
                 */

                if (reservas.isEmpty()) {

                    out.print(
                            "{\"encontrada\":false}"
                    );

                    return;
                }


                /*
                 * -------------------------------------------------
                 * RESERVAS ENCONTRADAS
                 * -------------------------------------------------
                 */

                out.print("{");

                out.print(
                        "\"encontrada\":true,"
                );

                out.print(
                        "\"cantidad\":"
                                + reservas.size()
                                + ","
                );

                out.print(
                        "\"reservas\":["
                );


                for (
                        int i = 0;
                        i < reservas.size();
                        i++
                ) {

                    Reserva reserva =
                            reservas.get(i);


                    out.print("{");


                    out.print(
                            "\"idReserva\":"
                                    + reserva.getIdReserva()
                                    + ","
                    );


                    out.print(
                            "\"nombre\":\""
                                    + escaparJson(
                                            reserva.getNombre()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"telefono\":\""
                                    + escaparJson(
                                            reserva.getTelefono()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"correo\":\""
                                    + escaparJson(
                                            reserva.getCorreo()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"personas\":\""
                                    + escaparJson(
                                            reserva.getPersonas()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"fecha\":\""
                                    + escaparJson(
                                            reserva.getFecha()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"hora\":\""
                                    + escaparJson(
                                            reserva.getHora()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"experiencia\":\""
                                    + escaparJson(
                                            reserva.getExperiencia()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"mensaje\":\""
                                    + escaparJson(
                                            reserva.getMensaje()
                                    )
                                    + "\","
                    );


                    out.print(
                            "\"estado\":\""
                                    + escaparJson(
                                            reserva.getEstado()
                                    )
                                    + "\""
                    );


                    out.print("}");


                    if (
                            i <
                            reservas.size() - 1
                    ) {

                        out.print(",");

                    }
                }


                out.print("]");
                out.print("}");


            } catch (Exception e) {

                e.printStackTrace();

                response.setStatus(
                        HttpServletResponse.SC_SERVICE_UNAVAILABLE
                );

                out.print(
                        "{\"encontrada\":false,\"error\":\"base_datos\"}"
                );
            }


            return;
        }

                // =====================================================
        // ELIMINAR RESERVA
        // =====================================================

        if ("eliminar".equals(accion)) {

            String idTexto =
                    request.getParameter("idReserva");

            response.setHeader(
                    "Access-Control-Allow-Origin",
                    "*"
            );

            response.setContentType(
                    "application/json;charset=UTF-8"
            );

            PrintWriter out =
                    response.getWriter();

            if (idTexto == null
                    || idTexto.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"eliminada\":false,\"mensaje\":\"El ID de la reserva es obligatorio.\"}"
                );

                return;
            }

            try {

                int idReserva =
                        Integer.parseInt(
                                idTexto.trim()
                        );

                boolean eliminada =
                        reservaDAO.eliminar(
                                idReserva
                        );

                if (eliminada) {

                    out.print(
                            "{\"eliminada\":true,\"mensaje\":\"Reserva eliminada correctamente.\"}"
                    );

                } else {

                    out.print(
                            "{\"eliminada\":false,\"mensaje\":\"No se encontró la reserva.\"}"
                    );
                }

            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"eliminada\":false,\"mensaje\":\"El ID de la reserva no es válido.\"}"
                );
            }

            return;
        }
        /*
         * =====================================================
         * LISTAR TODAS LAS RESERVAS
         * =====================================================
         */

        try {

            List<Reserva> reservas =
                    reservaDAO.listar();


            response.setHeader(
                    "Access-Control-Allow-Origin",
                    "*"
            );

            response.setContentType(
                    "text/html;charset=UTF-8"
            );


            PrintWriter out =
                    response.getWriter();


            out.println("<html>");
            out.println("<head>");
            out.println(
                    "<title>Reservas - Arte y Sabor</title>"
            );
            out.println("</head>");
            out.println("<body>");


            out.println(
                    "<h1>Reservas registradas</h1>"
            );


            if (reservas.isEmpty()) {

                out.println(
                        "<p>No hay reservas registradas.</p>"
                );

            } else {

                out.println(
                        "<table border='1'>"
                );


                out.println("<tr>");

                out.println("<th>ID</th>");
                out.println("<th>Nombre</th>");
                out.println("<th>Teléfono</th>");
                out.println("<th>Correo</th>");
                out.println("<th>Personas</th>");
                out.println("<th>Fecha</th>");
                out.println("<th>Hora</th>");
                out.println("<th>Experiencia</th>");
                out.println("<th>Mensaje</th>");
                out.println("<th>Estado</th>");
                out.println("<th>Motivo de cancelación</th>");

                out.println("</tr>");


                for (
                        Reserva reserva :
                        reservas
                ) {

                    out.println("<tr>");

                    out.println(
                            "<td>"
                                    + reserva.getIdReserva()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getNombre()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getTelefono()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getCorreo()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getPersonas()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getFecha()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getHora()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getExperiencia()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getMensaje()
                                    + "</td>"
                    );

                    out.println(
                            "<td>"
                                    + reserva.getEstado()
                                    + "</td>"
                    );
                    out.println("<td>" + reserva.getMotivoCancelacion() + "</td>");
                    out.println("</tr>");
                }


                out.println("</table>");
            }


            out.println("</body>");
            out.println("</html>");


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_SERVICE_UNAVAILABLE
            );

            response.setContentType(
                    "text/html;charset=UTF-8"
            );

            response.getWriter().println(
                    "<h1>No fue posible consultar las reservas</h1>"
            );

            response.getWriter().println(
                    "<p>La base de datos no está disponible.</p>"
            );
        }
    }


    // =========================================================
    // POST: CREAR RESERVA
    // =========================================================

   @Override
protected void doPost(
        HttpServletRequest request,
        HttpServletResponse response)
        throws ServletException, IOException {

    request.setCharacterEncoding("UTF-8");

    response.setHeader(
            "Access-Control-Allow-Origin",
            "*"
    );

    response.setContentType(
            "application/json;charset=UTF-8"
    );

    PrintWriter out =
            response.getWriter();

    String accion =
            request.getParameter("accion");


    // =========================================================
    // CANCELAR RESERVA
    // =========================================================

    if ("cancelar".equals(accion)) {

        String idReservaParametro =
                request.getParameter("idReserva");

        String motivo =
                request.getParameter("motivo");


        // -----------------------------------------------------
        // VALIDAR DATOS
        // -----------------------------------------------------

        if (
                idReservaParametro == null
                || idReservaParametro.trim().isEmpty()
                || motivo == null
                || motivo.trim().isEmpty()
        ) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"cancelada\":false,\"error\":\"datos_incompletos\"}"
            );

            return;
        }


        try {

            int idReserva =
                    Integer.parseInt(
                            idReservaParametro
                    );


            boolean cancelada =
                    reservaDAO.cancelar(
                            idReserva,
                            motivo.trim()
                    );


            if (cancelada) {

                out.print(
                        "{\"cancelada\":true,\"mensaje\":\"La reserva fue cancelada correctamente.\"}"
                );

            } else {

                out.print(
                        "{\"cancelada\":false,\"mensaje\":\"No fue posible cancelar la reserva. Puede que ya haya sido cancelada o no exista.\"}"
                );
            }


        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"cancelada\":false,\"error\":\"id_invalido\"}"
            );


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_SERVICE_UNAVAILABLE
            );

            out.print(
                    "{\"cancelada\":false,\"error\":\"base_datos\"}"
            );
        }

        return;
    }


    // =========================================================
    // CREAR RESERVA
    // =========================================================

    String nombre =
            request.getParameter("nombre");

    String telefono =
            request.getParameter("telefono");

    String correo =
            request.getParameter("correo");

    String personas =
            request.getParameter("personas");

    String fecha =
            request.getParameter("fecha");

    String hora =
            request.getParameter("hora");

    String experiencia =
            request.getParameter("experiencia");

    String mensaje =
            request.getParameter("mensaje");


    System.out.println(
            "HORA RECIBIDA: " + hora
    );


    Reserva reserva =
            new Reserva(
                    nombre,
                    telefono,
                    correo,
                    personas,
                    fecha,
                    hora,
                    experiencia,
                    mensaje
            );


    boolean creada =
            reservaDAO.crear(reserva);


    if (creada) {

        out.print(
                "{\"creada\":true,\"mensaje\":\"Reserva creada correctamente.\"}"
        );

    } else {

        out.print(
                "{\"creada\":false,\"mensaje\":\"No fue posible crear la reserva.\"}"
        );
    }
}
    // =========================================================
    // ESCAPAR CARACTERES ESPECIALES PARA JSON
    // =========================================================

    private String escaparJson(
            String texto) {

        if (texto == null) {

            return "";
        }


        return texto
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}
