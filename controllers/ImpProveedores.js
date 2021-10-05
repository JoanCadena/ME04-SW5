/**
 * CONTROLADOR DE CLIENTES
 */
//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

let validarCliente = (cliente) => {
    if (!cliente) {
        throw { ok: false, mensaje: "La información del cliente es obligatoria."};
    }
    if (!cliente.documento) {
        throw { ok: false, mensaje: "El documento del cliente es obligatorio."};
    }
    if (!cliente.nombre) {
        throw { ok: false, mensaje: "El nombre del cliente es obligatorio." };
    }
    if (!cliente.telefono) {
        throw { ok: false, mensaje: "El telefono del cliente es obligatorio." };
    }
    if (!cliente.direccion) {
        throw { ok: false, mensaje: "La dirección del cliente es obligatoria."};
    }
    if (!cliente.correo) {
        throw { ok: false, mensaje: "El correo del cliente es obligatorio." };
    }
    if (!cliente.edad) {
        throw { ok: false, mensaje: "La edad del cliente es obligatoria." };
    }
};

let guardarCliente = async (cliente) => {
    let _servicio = new ServicioPg();
    let sql = `INSERT INTO public.clientes(
	    documento, nombre, telefono, direccion, correo, edad)
	    VALUES (${cliente.documento}, '${cliente.nombre}', '${cliente.telefono}', 
        '${cliente.direccion}', '${cliente.correo}', ${cliente.edad});`;

    let respuesta = await _servicio.ejecutarSql(sql);
    console.log(respuesta);
    return respuesta;
};

let consultarClientes = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.clientes;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let consultarCliente = async (documento_cliente) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.clientes WHERE documento = ${documento_cliente};`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let eliminarCliente = async (documento_cliente) => {
    let _servicio = new ServicioPg();
    let sql = `DELETE FROM public.clientes WHERE  documento= ${documento_cliente} cascade`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let actualizarCliente = async (documento_cliente, body) => {
    let _servicio = new ServicioPg();
    let sql = `UPDATE public.clientes
	SET nombre='${body.nombre}', telefono='${body.telefono}', 
        direccion='${body.direccion}', correo='${body.correo}', edad=${body.edad}
	    WHERE documento = ${documento_cliente};`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

module.exports = {
    validarCliente,
    guardarCliente,
    consultarClientes,
    consultarCliente,
    eliminarCliente,
};
