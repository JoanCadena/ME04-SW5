/**
 * CONTROLADOR DE PROVEEDOR
 */
//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

let validarProveedor = (proveedor) => {
    if (!proveedor) {
        throw { ok: false, mensaje: "La información del proveedor es obligatoria."};
    }
    if (!proveedor.id) {
        throw { ok: false, mensaje: "El ID del proveedor es obligatorio."};
    }
    if (!proveedor.nombre) {
        throw { ok: false, mensaje: "El nombre del proveedor es obligatorio." };
    }
    if (!proveedor.telefono) {
        throw { ok: false, mensaje: "El telefono del proveedor es obligatorio." };
    }
    if (!proveedor.correo) {
        throw { ok: false, mensaje: "El correo del proveedor es obligatorio." };
    }
};

let guardarProveedor = async (proveedor) => {
    let _servicio = new ServicioPg();
    let sql = `INSERT INTO public.proveedores(
	    id, nombre, telefono, correo)
	    VALUES (${proveedor.id}, '${proveedor.nombre}', 
            '${proveedor.telefono}','${proveedor.correo}';`;

    let respuesta = await _servicio.ejecutarSql(sql);
    console.log(respuesta);
    return respuesta;
};

let consultarProveedores = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.proveedores;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let consultarProveedor = async (id_proveedor) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.proveedores WHERE id = ${id_proveedor};`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let eliminarProveedor = async (id_proveedor) => {
    let _servicio = new ServicioPg();
    let sql = `DELETE FROM public.proveedores WHERE  id= ${id_proveedor} cascade`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let actualizarProveedor = async (id_proveedor, body) => {
    let _servicio = new ServicioPg();
    let sql = `UPDATE public.proveedores
	SET nombre='${body.nombre}', telefono='${body.telefono}', 
        correo='${body.correo}' WHERE id = ${id_proveedor};`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

module.exports = {
    validarProveedor,
    guardarProveedor,
    consultarProveedores,
    consultarProveedor,
    eliminarProveedor,
};
