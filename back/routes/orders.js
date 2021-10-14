const router = require("express").Router();
const pool = require("../database");

router.post("/makeOrder", async (req, res) => {
    try {
        const { shipping, price, productIds } = req.body;
        const username = req.username;

        const { fullName, city, country, postalCode, address, paymentMethod } = shipping;
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = price;

        const [ rows ] = await pool.execute(`
            INSERT INTO 
            orders ( fullName, city, country, postalCode, address, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
            ;
        `, [ fullName, city, country, postalCode, address, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice ]);
        
        await pool.execute(`
            INSERT INTO
            orders_users_products ( order_id, username, product_id )
            VALUES ${productIds.map(id => `( ${rows.insertId}, '${username}', ${id} )`)}
            ;
        `);

        res.status(201).json({ message: "New Order Created", orderId: rows.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong.", error });
    }
});

router.get("/orderId/:id", async (req, res) => {
    try {
        const [ [rows1], [rows2] ] = await Promise.all([
            pool.execute(`
                SELECT * 
                FROM orders AS o
                WHERE o.id = ? 
                ;
            `, [ req.params.id ]),

            pool.execute(`
                SELECT p.product_id
                FROM orders AS o
                JOIN orders_users_products AS p
                    ON p.order_id = o.id
                WHERE p.order_id = ?
                ;
            `, [ req.params.id ])
        ]);

        const products = rows2.map(item => item.product_id);

        res.status(200).json({ order: rows1[0], products });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/username/:username", async (req, res) => {
    try {

        const [ rows ] = await pool.execute(`
            SELECT DISTINCT u.order_id
            FROM orders_users_products AS u
            WHERE u.username = ?
            ;
        `, [ req.params.username ]);

        const orders = rows.map(item => item.order_id);

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put("/products", async (req, res) => {
    try {
        const { products } = req.body;


        const rows = await Promise.all(
            products.map(id => {
                return pool.execute(`
                    SELECT image
                    FROM products
                    WHERE id = ?
                `, [id])
            })
        );

        const images = rows.map(item => item[0][0]);
        res.status(200).json({ images });

    } catch (error) {
        res.status(500).json({ error });
    }


});


module.exports = router;