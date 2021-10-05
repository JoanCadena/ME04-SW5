const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("../config");

const _controlador = require("../controllers/impVentas");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.MY_USER,
        pass: config.MY_PASS,
    },
});

router.get("/services/serviciosVenta/ventas", (req, res) => {
    _controlador
        .consultarVentas()
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

router.get(
    "/services/serviciosVenta/venta/:id_venta",
    (req, res) => {
        let id_venta = req.params.id_venta;

        _controlador
            .consultarVenta(id_venta)
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
    }
);

router.post("/services/serviciosVenta/venta", (req, res) => {
    try {
        let info_venta = req.body;

        _controlador.validarVenta(info_venta);

        var mailOptions = {
            from: config.MY_USER,
            to: `inmortal_20@live.com`,
            subject: "Registro Añadido",
            text: `
            Se ha añadido un nuevo registro a la DB, 
            en este caso una nueva venta ha sido 
            añadido. A continuación información relevante 
            de la venta en cuestión: 
            
            - ID venta: ${req.body.id}
            - Detalles: ${req.body.detalles} 
            - Fecha venta: ${req.body.fecha}
            - Valor: ${req.body.valor}
            
            Para más información, por favor responda este mensaje `,
        };

        _controlador
            .guardarVenta(info_venta)
            .then((respuestaDB) => {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                });
                res.send({
                    ok: true,
                    mensaje: "Venta guardada",
                    info: info_venta,
                });
            })
            .catch((error) => {
                res.send(error);
            });
    } catch (error) {
        res.send(error);
    }
});

router.delete(
    "/services/serviciosVenta/venta/:id_venta",
    (req, res) => {
        let id_venta = req.params.id_venta;
        if (id_venta) {

            var mailOptions = {
                from: config.MY_USER,
                to: `inmortal_20@live.com`,
                subject: "Registro Añadido",
                text: `
                Se ha eliminado un registro de la DB, 
                en este caso se ha eliminado una venta. 
                A continuación información relevante 
                de la venta en cuestión: 
                
                - ID venta: ${req.body.id}
                
                Para más información, por favor responda este mensaje `,
            };


            _controlador
                .eliminarVenta(id_venta)
                .then((respuestaDB) => {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    res.send({
                        ok: true,
                        info: {},
                        mensaje: "Venta eliminada",
                    });
                })
                .catch((error) => {
                    res.send(error);
                });
        }
    }
);

router.put(
    "/services/serviciosVenta/venta/:id_venta",
    (req, res) => {
        let id_venta = req.params.id_venta;

        var mailOptions = {
            from: config.MY_USER,
            to: `inmortal_20@live.com`,
            subject: "Registro Añadido",
            text: `
            Se ha actualizado un registro en la DB, 
            en este caso una venta ha sido actualizada. 
            A continuación información relevante 
            de la venta en cuestión: 
            
            - ID venta: ${req.body.id}
            - Detalles modificados: ${req.body.detalles} 
            - Fecha modificada de venta: ${req.body.fecha}
            - Valor modificado: ${req.body.valor}
            
            Para más información, por favor responda este mensaje `,
        };

        _controlador
            .actualizarVenta(id_venta, req.body)
            .then((respuestaDB) => {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                });
                res.send({
                    ok: true,
                    info: {},
                    mensaje: "Venta actualizada",
                });
            })
            .catch((error) => {
                res.send(error);
            });
    }
);

module.exports = router;
