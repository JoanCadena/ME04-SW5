const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/impProveedores");

/**
 * Obtener todas los datos de los proveedores
 */
router.get("/services/serviciosProveedor/proveedores", (req, res) => {
    _controlador
        .consultarProveedores()
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
 * Obtener todas los datos de un proveedor especifico
 */
router.get("/services/serviciosProveedor/proveedor/:id_proveedor", (req, res) => {
    let id_proveedor = req.params.id_proveedor;

    _controlador
        .consultarProveedor(id_proveedor)
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
 * Guarda un proveedor
 */
router.post("/services/serviciosProveedor/proveedor", (req, res) => {
    try {
        let info_proveedor = req.body;

        _controlador.validarProveedor(info_proveedor);

        _controlador
            .guardarProveedor(info_proveedor)
            .then((respuestaDB) => {
                res.send({
                    ok: true,
                    mensaje: "Proveedor guardado",
                    info: info_proveedor,
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
 * Eliminar un proveedor
 */
router.delete("/services/serviciosProveedor/proveedor/:id_proveedor", (req, res) => {
    let id_proveedor = req.params.id_proveedor;

    if (id_proveedor) {
        _controlador
            .eliminarProveedor(id_proveedor)
            .then((respuestaDB) => {
                res.send({ ok: true, info: {}, mensaje: "Proveedor eliminado" });
            })
            .catch((error) => {
                res.send(error);
            });
    }
});

/**
 * Actualizar un proveedor
 */
router.put("/services/serviciosProveedor/proveedor/:id_proveedor", (req, res) => {
    let id_proveedor = req.params.id_proveedor;

    _controlador
        .actualizarProveedor(id_proveedor, req.body)
        .then((respuestaDB) => {
            res.send({
                ok: true,
                info: {},
                mensaje: "Proveedor actualizado",
            });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
