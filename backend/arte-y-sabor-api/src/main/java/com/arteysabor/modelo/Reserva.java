package com.arteysabor.modelo;

public class Reserva {

    private int idReserva;
    private String nombre;
    private String telefono;
    private String correo;
    private String personas;
    private String fecha;
    private String hora;
    private String experiencia;
    private String mensaje;
    private String estado;
    private String motivoCancelacion;

    public Reserva() {
    }

    public Reserva(String nombre, String telefono, String correo,
                    String personas, String fecha, String hora,
                    String experiencia, String mensaje) {

        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.personas = personas;
        this.fecha = fecha;
        this.hora = hora;
        this.experiencia = experiencia;
        this.mensaje = mensaje;
        this.estado = "ACTIVA";
    }

    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPersonas() {
        return personas;
    }

    public void setPersonas(String personas) {
        this.personas = personas;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(String experiencia) {
        this.experiencia = experiencia;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getMotivoCancelacion() {
        return motivoCancelacion;
    }

    public void setMotivoCancelacion(String motivoCancelacion) {
        this.motivoCancelacion = motivoCancelacion;
    }
}