const router = require("express").Router();
const pool = require("../database");

// router.get("/:id", async (req, res) => {

//     try {
//         const [rows] = await pool.execute(`
//             SELECT * FROM followers 
//             JOIN products 
//                 ON seller_id = following_id 
//             WHERE follower_id = ?`, 
//             [req.params.id]);
            
//         const result = rows.map(item => {
//             let {follower_id, following_id, ...other} = item;
//             return other;
//         });

//         return res.status(200).send(result);
//     } catch (err) {
//         return res.status(500).send(err);
//     }
// });

router.get("/topStores/:limit", async (req, res) => {
    
    try {
        const limit = req.params.limit;

        const [rows] = await pool.execute(`
            SELECT *
            FROM users
            ORDER BY rating
            LIMIT ?
            ;
        `, [limit]);

        const stores = rows.map(item => {
            const { password, email, ...rest } = item;
            return rest;
        });

        res.status(200).json({ stores });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
    }
});

// router.get("/topProducts/:limit", async (req, res) => {

//     const limit = req.params.limit;

//     try {

//         const [ rows ] = await pool.execute(
//            `SELECT *
//             FROM products
//             ORDER BY soldCount DESC
//             LIMIT ?`,
//             [ limit ]
//         );

//         res.status(200).json({ products: rows });

//     } catch (err) {
//         res.status(500).json({ message: "Something went wrong", error: err });
//     }

// }); 


// user info for store page
router.get("/user/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const [ [ rows ] ] = await pool.execute(`
            SELECT *
            FROM users
            WHERE username = ?
            ;
        `, [ username ]);

        const { password, ...other } = rows;

        res.status(200).json({ user: other });

    } catch (error) {
        res.status(500).json({ error });
    }
});


// products query...
router.get("/query", async (req, res) => {

    try {
        let { category, order, dir, limit, page, store, search } = req.query;
        

        let where = "WHERE ";
        if (category !== "All") where += (`category = '${category}' AND `);
        if (store !== "All") where += (`seller_un = '${store}' AND `);
        if (search !== "" || !search) where += (`p.name LIKE '${search.split(" ").map(item => `%${item}`).join("") + '%' }'`);
        if (where.endsWith("AND ")) where = where.slice(0, where.length-5);

        const [ rows ] = await pool.execute(
            `SELECT *
            FROM products AS p
            ${where}
            ORDER BY ${order} ${dir}
            LIMIT ${limit}
            OFFSET ${(page-1) * limit};`
        );

        res.status(200).json({ products: rows });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
    }
});


// number of products
router.get("/count", async (req, res) => {

    try {
        const { category, username } = req.query;

        const sql = category === "All"
            ? (username === "All"
                ? "SELECT COUNT(*) FROM products;"
                : `SELECT COUNT(*) FROM products WHERE seller_un = '${username}';`)
            : (username === "All"
                ? `SELECT COUNT(*) FROM products WHERE category = '${category}';`
                : `SELECT COUNT(*) FROM products WHERE category = '${category}' AND seller_un = '${username}'`);
        const [ [ count ] ] = await pool.execute(sql);

        res.status(200).json({ count: count['COUNT(*)'] });

    } catch (error) {
        res.status(500).json({ error });
    }
});


// product info for product page
router.get("/:username/:id", async (req, res) => {
    try {
        const { username, id } = req.params;

        const [ [ rows ], [ images ] ] = await Promise.all([
            pool.execute(`
                SELECT * 
                FROM products
                WHERE seller_un = ? AND id = ?
                ;
            `, [username, id]),
            pool.execute(`
                SELECT i.image, i.id
                FROM products p
                JOIN images i
                    ON p.id = i.owner_id
                WHERE p.id = ?
                ;
            `, [id])
        ]);

        if (rows.length === 0)
            return res.status(404).json({ message: "Product not found." });

        res.status(200).json({ product: rows[0], images });

    } catch (error) {
        res.status(500).json({ error });
    }
});


// products in cart
router.post("/cart", async (req, res) => {
    try {
        const ids = req.body.ids;

        const [ rows ] = await pool.execute(`
            SELECT *
            FROM products
            WHERE id IN (${ids.join(",")})
            ;
        `);

        res.status(200).json({ products: rows });
    } catch (error) {

    }
});


module.exports = router;