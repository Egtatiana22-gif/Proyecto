package com.arteysabor.dao;

import com.arteysabor.config.ConexionBD;
import com.arteysabor.modelo.Reserva;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ReservaDAO {

    // =========================================================
    // CREAR RESERVA
    // =========================================================

    public boolean crear(Reserva reserva) {

        String sql = """
            INSERT INTO reservas
            (
                nombre,
                telefono,
                correo,
                personas,
                fecha,
                hora,
                experiencia,
                mensaje
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """;

        try (
            Connection conexion = ConexionBD.conectar();
            PreparedStatement sentencia =
                    conexion.prepareStatement(sql)
        ) {

            sentencia.setString(
                    1,
                    reserva.getNombre()
            );

            sentencia.setString(
                    2,
                    reserva.getTelefono()
            );

            sentencia.setString(
                    3,
                    reserva.getCorreo()
            );

            sentencia.setString(
                    4,
                    reserva.getPersonas()
            );

            sentencia.setString(
                    5,
                    reserva.getFecha()
            );

            sentencia.setString(
                    6,
                    reserva.getHora()
            );

            sentencia.setString(
                    7,
                    reserva.getExperiencia()
            );

            sentencia.setString(
                    8,
                    reserva.getMensaje()
            );

            return sentencia.executeUpdate() > 0;

        } catch (SQLException e) {

            e.printStackTrace();
            return false;
        }
    }


    // =========================================================
    // LISTAR TODAS LAS RESERVAS
    // =========================================================

    public List<Reserva> listar() {

        List<Reserva> reservas =
                new ArrayList<>();

        String sql = """
            SELECT *
            FROM reservas
            ORDER BY id_reserva DESC
            """;

        try (
            Connection conexion =
                    ConexionBD.conectar();

            PreparedStatement sentencia =
                    conexion.prepareStatement(sql);

            ResultSet resultado =
                    sentencia.executeQuery()
        ) {

            while (resultado.next()) {

                reservas.add(
                        convertirReserva(resultado)
                );
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return reservas;
    }


    // =========================================================
    // ACTUALIZAR RESERVA
    // =========================================================

    public boolean actualizar(Reserva reserva) {

        String sql = """
            UPDATE reservas
            SET
                nombre = ?,
                telefono = ?,
                correo = ?,
                personas = ?,
                fecha = ?,
                hora = ?,
                experiencia = ?,
                mensaje = ?,
                estado = ?,
                motivo_cancelacion = ?
            WHERE id_reserva = ?
            """;

        try (
            Connection conexion =
                    ConexionBD.conectar();

            PreparedStatement sentencia =
                    conexion.prepareStatement(sql)
        ) {

            sentencia.setString(
                    1,
                    reserva.getNombre()
            );

            sentencia.setString(
                    2,
                    reserva.getTelefono()
            );

            sentencia.setString(
                    3,
                    reserva.getCorreo()
            );

            sentencia.setString(
                    4,
                    reserva.getPersonas()
            );

            sentencia.setString(
                    5,
                    reserva.getFecha()
            );

            sentencia.setString(
                    6,
                    reserva.getHora()
            );

            sentencia.setString(
                    7,
                    reserva.getExperiencia()
            );

            sentencia.setString(
                    8,
                    reserva.getMensaje()
            );

            sentencia.setString(
                    9,
                    reserva.getEstado()
            );

            sentencia.setString(
                    10,
                    reserva.getMotivoCancelacion()
            );

            sentencia.setInt(
                    11,
                    reserva.getIdReserva()
            );

            return sentencia.executeUpdate() > 0;

        } catch (SQLException e) {

            e.printStackTrace();
            return false;
        }
    }


    // =========================================================
    // ELIMINAR RESERVA
    // =========================================================

    public boolean eliminar(int idReserva) {

        String sql = """
            DELETE FROM reservas
            WHERE id_reserva = ?
            """;

        try (
            Connection conexion =
                    ConexionBD.conectar();

            PreparedStatement sentencia =
                    conexion.prepareStatement(sql)
        ) {

            sentencia.setInt(
                    1,
                    idReserva
            );

            return sentencia.executeUpdate() > 0;

        } catch (SQLException e) {

            e.printStackTrace();
            return false;
        }
    }
// =========================================================
// CANCELAR RESERVA
// =========================================================

public boolean cancelar(
        int idReserva,
        String motivo) {

    String sql = """
        UPDATE reservas
        SET
            estado = 'CANCELADA',
            motivo_cancelacion = ?
        WHERE id_reserva = ?
        AND estado = 'ACTIVA'
        """;

    try (
        Connection conexion =
                ConexionBD.conectar();

        PreparedStatement sentencia =
                conexion.prepareStatement(sql)
    ) {

        sentencia.setString(
                1,
                motivo
        );

        sentencia.setInt(
                2,
                idReserva
        );

        return sentencia.executeUpdate() > 0;

    } catch (SQLException e) {

        e.printStackTrace();
        return false;
    }
}

    // =========================================================
    // CONSULTAR RESERVAS POR NOMBRE + CORREO O TELÉFONO
    // =========================================================

    public List<Reserva> consultarPorContacto(
            String nombre,
            String correo,
            String telefono) {

        List<Reserva> reservas =
                new ArrayList<>();

        String sql;

        /*
         * Si se proporciona correo,
         * buscamos por nombre + correo.
         */
        if (correo != null && !correo.trim().isEmpty()) {

            sql = """
                SELECT *
                FROM reservas
                WHERE nombre = ?
                AND correo = ?
                ORDER BY fecha DESC, id_reserva DESC
                """;

            try (
                Connection conexion =
                        ConexionBD.conectar();

                PreparedStatement sentencia =
                        conexion.prepareStatement(sql)
            ) {

                sentencia.setString(
                        1,
                        nombre
                );

                sentencia.setString(
                        2,
                        correo
                );

                ResultSet resultado =
                        sentencia.executeQuery();

                while (resultado.next()) {

                    reservas.add(
                            convertirReserva(resultado)
                    );
                }

            } catch (SQLException e) {

                e.printStackTrace();
            }

        /*
         * Si no hay correo pero sí teléfono,
         * buscamos por nombre + teléfono.
         */
        } else if (
                telefono != null
                && !telefono.trim().isEmpty()
        ) {

            sql = """
                SELECT *
                FROM reservas
                WHERE nombre = ?
                AND telefono = ?
                ORDER BY fecha DESC, id_reserva DESC
                """;

            try (
                Connection conexion =
                        ConexionBD.conectar();

                PreparedStatement sentencia =
                        conexion.prepareStatement(sql)
            ) {

                sentencia.setString(
                        1,
                        nombre
                );

                sentencia.setString(
                        2,
                        telefono
                );

                ResultSet resultado =
                        sentencia.executeQuery();

                while (resultado.next()) {

                    reservas.add(
                            convertirReserva(resultado)
                    );
                }

            } catch (SQLException e) {

                e.printStackTrace();
            }
        }

        return reservas;
    }


    // =========================================================
    // CONVERTIR RESULTADO SQL EN RESERVA
    // =========================================================

    private Reserva convertirReserva(
            ResultSet resultado)
            throws SQLException {

        Reserva reserva =
                new Reserva();

        reserva.setIdReserva(
                resultado.getInt("id_reserva")
        );

        reserva.setNombre(
                resultado.getString("nombre")
        );

        reserva.setTelefono(
                resultado.getString("telefono")
        );

        reserva.setCorreo(
                resultado.getString("correo")
        );

        reserva.setPersonas(
                resultado.getString("personas")
        );

        reserva.setFecha(
                resultado.getString("fecha")
        );

        reserva.setHora(
                resultado.getString("hora")
        );

        reserva.setExperiencia(
                resultado.getString("experiencia")
        );

        reserva.setMensaje(
                resultado.getString("mensaje")
        );

        reserva.setEstado(
                resultado.getString("estado")
        );

        reserva.setMotivoCancelacion(
                resultado.getString("motivo_cancelacion")
        );

        return reserva;
    }
}
