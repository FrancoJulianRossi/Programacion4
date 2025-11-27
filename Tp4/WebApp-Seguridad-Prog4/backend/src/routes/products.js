const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta de productos (vulnerable a SQL injection)
router.get('/products', productController.getProducts);

//Ruta para validacion SQL Injection
router.post('/search', (req, res) => {
    const {
        query
    } = req.body || {};

    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({
            error: 'Query vacía o no válida'
        });
    }

    if (query.includes(';') || query.includes('--')) {
        return res.status(400).json({
            error: 'Entrada contiene caracter peligroso para SQL injection'
        });
    }

    return res.status(200).json({
        results: [],
        query: query,
        message: 'Búsqueda realizada exitosamente'
    });
});

module.exports = router;
