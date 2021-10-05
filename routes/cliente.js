const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/impClientes");

/**
 * Obtener todas los datos de los clientes
 */
router.get("/clientes", (req, res) => {
    _controlador
        .consultarClientes()
        .then((respuestaDB) => {
            let registros = respuestaDB.rows;
            res.send({
                ok: true,
                info: registros,
                mensaje: "Registros consultados",
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

/**
 * Obtener todas los datos de un cliente especifico
 */
router.get("/serviciosCliente/cliente/:documento_cliente", (req, res) => {
    let documento_cliente = req.params.documento_cliente;

    _controlador
        .consultarCliente(documento_cliente)
        .then((respuestaDB) => {
            let registros = respuestaDB.rows;
            res.send({
                ok: true,
                info: registros,
                mensaje: "Registro consultado",
            });
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Guarda un cliente
 */
router.post("/serviciosCliente/cliente", (req, res) => {
    try {
        let info_cliente = req.body;

        _controlador.validarCliente(info_cliente);

        _controlador
            .guardarCliente(info_cliente)
            .then((respuestaDB) => {
                res.send({
                    ok: true,
                    mensaje: "Cliente guardado",
                    info: info_cliente,
                });
            })
            .catch((error) => {
                res.send(error);
            });
    } catch (error) {
        res.send(error);
    }
});

/**
 * Eliminar un cliente
 */
router.delete("/serviciosCliente/cliente/:documento_cliente", (req, res) => {
    let documento_cliente = req.params.documento_cliente;

    if (documento_cliente) {
        _controlador
            .eliminarCliente(documento_cliente)
            .then((respuestaDB) => {
                res.send({ ok: true, info: {}, mensaje: "Cliente eliminado" });
            })
            .catch((error) => {
                res.send(error);
            });
    }
});

/**
 * Actualizar un cliente
 */
router.put("/serviciosCliente/cliente/:documento_cliente", (req, res) => {
    let documento_cliente = req.params.documento_cliente;

    _controlador
        .actualizarCliente(documento_cliente, req.body)
        .then((respuestaDB) => {
            res.send({
                ok: true,
                info: {},
                mensaje: "Cliente actualizado",
            });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
