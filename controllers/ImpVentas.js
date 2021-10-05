/**
 * CONTROLADOR DE VENTAS
 */
//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

let validarVenta = (venta) => {
    if (!venta) {
        throw { ok: false, mensaje: "La información de la venta es obligatoria."};
    }
    if (!venta.id) {
        throw { ok: false, mensaje: "El id de la venta es obligatorio."};
    }
    if (!venta.detalles) {
        throw { ok: false, mensaje: "Los detalles de la venta es obligatorio." };
    }
    if (!venta.fecha) {
        throw { ok: false, mensaje: "La fecha de la venta es obligatorio." };
    }
    if (!venta.valor) {
        throw { ok: false, mensaje: "El valor de la venta es obligatoria."};
    }
};

let guardarVenta = async (venta) => {
    let _servicio = new ServicioPg();
    let sql = `INSERT INTO public.ventas(
	    id, detalles, fecha, valor)
	    VALUES ('${venta.id}', '${venta.detalles}', '${venta.fecha}', 
        ${venta.valor});`;

    let respuesta = await _servicio.ejecutarSql(sql);
    console.log(respuesta);
    return respuesta;
};

let consultarVentas = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.ventas;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let consultarVenta = async (id_venta) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.ventas WHERE id = '${id_venta}';`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let eliminarVenta = async (id_venta) => {
    let _servicio = new ServicioPg();
    let sql = `DELETE FROM public.ventas WHERE  id= '${id_venta}' cascade`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let actualizarVenta = async (id_venta, body) => {
    let _servicio = new ServicioPg();
    let sql = `UPDATE public.ventas
	SET detalles='${body.detalles}', fecha='${body.fecha}', 
        valor=${body.valor} WHERE id = '${id_venta}';`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

module.exports = {
    validarVenta,
    guardarVenta,
    consultarVentas,
    consultarVenta,
    eliminarVenta,
};
