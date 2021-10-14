const router = require("express").Router();
const pool = require("../database");

// add product 
router.post("/add/:username", async (req, res) => {
    
    try {
        const { images, ...rest } = req.body;
        let product = {
            ...rest,
            seller_un: req.params.username
        }

        if (images !== undefined && images.length !== 0) {
            product.image = images[0];
        }

        const values = Object.values(product);

        const [ rows ] = await pool.execute(`
            INSERT INTO products ( ${Object.keys(product)} ) 
            VALUES ( ${Object.values(product).map(item => "?").join(",")} ); 
        `, values);
        
        if (rows.affectedRows === 0)
            return res.status(400).json({ message: "Bad request." });


        if (images !== undefined && images.length !== 0) {
            await pool.execute(`
                INSERT INTO images ( image, owner_id )
                VALUES
                    ${ images.map(item => `( '${item}', ${rows.insertId} )`) }
            `);
        }

        return res.status(200).json({ message: "Product successfully added." });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// get all products from user
router.get("/all/:username", async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT * 
            FROM products 
            WHERE seller_un = ?
            ;
        `, [req.params.username]);
        return res.status(200).json({ products: rows });
    } catch (err) {
        return res.status(500).json(err);
    }
});

// update product
router.put("/update/:id/:username", async (req, res) => {
    try {
        let { images, ...changes } = req.body;
        if (images.length !== 0) {
            changes.image = images[0];
        }
        
        const { id, username } = req.params;
        const keys = Object.keys(changes);
        const values  = Object.values(changes);

        await pool.execute(`
            SET SQL_SAFE_UPDATES = 0
            ;
        `);

        if (keys.length !== 0) {
            let str = "";
            for (let i=0; i<keys.length; i++) str += `${keys[i]} = ?,`;
            str = str.slice(0, -1);
            values.push(req.params.id);
        
            const [rows] = await pool.execute("UPDATE products SET " + str + " WHERE id = ?;", values);

            if (rows.affectedRows === 0) {
                await pool.execute(`
                    SET SQL_SAFE_UPDATES = 1
                    ;
                `);
                return res.status(404).json({ message:"Product not found!" });
            }
        }

        if (images !== undefined && images.length !== 0) {
            await pool.execute(`
                DELETE FROM images
                WHERE owner_id = ?
                ;
            `, [ id ]);
    
            await pool.execute(`
                INSERT INTO images ( image, owner_id )
                VALUES
                    ${ images.map(item => `( '${item}', ${id} )`) }
            `);
        }
        await pool.execute(`
            SET SQL_SAFE_UPDATES = 1
            ;
        `);
        res.status(200).json({ message: "Product updated." });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/remove/:id/:username", async (req, res) => {
    try {
        const { id, username } = req.params;

        const [ rows ] = await Promise.all([
            pool.execute(`
                DELETE FROM products
                WHERE seller_un = ? AND id = ?;
            `, [username, id]),
            pool.execute(`
                DELETE FROM images
                WHERE owner_id = ?
            `, [ id ])
        ]);
        
        if (rows.affectedRows === 0) 
            return res.status(404).json({ message:"Product not found!" });

        return res.status(200).json({ message: "Product deleted." });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;