package com.arteysabor.prueba;

import com.arteysabor.dao.ReservaDAO;
import com.arteysabor.modelo.Reserva;

import java.util.List;

public class PruebaReservaDAO {

    public static void main(String[] args) {

        ReservaDAO dao = new ReservaDAO();

        // CREAR
        Reserva nueva = new Reserva(
                "Prueba DAO",
                "3001112233",
                "prueba.dao@arteysabor.com",
                "3",
                "2026-10-15",
                "7:00 PM",
                "Cena especial",
                "Prueba CRUD desde Java"
        );

        System.out.println("CREAR: " + dao.crear(nueva));

        // CONSULTAR
        List<Reserva> reservas = dao.listar();

        System.out.println("TOTAL RESERVAS: " + reservas.size());

        // Buscar la reserva que acabamos de crear
        Reserva creada = null;

        for (Reserva reserva : reservas) {

            if ("prueba.dao@arteysabor.com".equals(reserva.getCorreo())) {
                creada = reserva;
                break;
            }
        }

        // ACTUALIZAR Y ELIMINAR
        if (creada != null) {

            creada.setNombre("Prueba DAO Actualizada");
            creada.setMensaje("Actualización CRUD");

            System.out.println("ACTUALIZAR: " + dao.actualizar(creada));

            System.out.println("ELIMINAR: " + dao.eliminar(creada.getIdReserva()));

        } else {

            System.out.println("No se encontró la reserva de prueba.");
        }
    }
}