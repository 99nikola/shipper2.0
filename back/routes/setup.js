const router = require("express").Router();
const pool = require("../database");


// get categories
router.get("/get-categories", async (req, res) => {

    try {
        const [ rows ] = await pool.execute("SELECT * FROM categories", [-1]);

        let map = {}, node, root = [], i;

        for (i=0; i<rows.length; i++) {
            map[rows[i].id] = i;
            rows[i].children = [];
        }
        
        for (i=0; i<rows.length; i++) {
            node = rows[i];
            const {parent_id, ...other} = node;
            if (node.parent_id !== 0) {
                rows[map[node.parent_id]].children.push(other);
            } else {
                root.push(other);
            }
        }

        return res.status(200).send(root);

    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("/categoryLeaves", async (req, res) => {
    try {
        const [ rows ] = await pool.execute(`
            SELECT c1.name FROM categories AS c1
            LEFT JOIN categories AS c2 ON (c2.parent_id = c1.id)
            WHERE c2.id IS NULL;`);
        
        res.status(200).json({ categories: rows });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/userExists/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const [ rows ] = await pool.execute(`
            SELECT id 
            FROM users
            WHERE username = ?;`,
            [ username ]
        );

        if (rows.length === 0) 
            return res.status(404).json({ userExists: false });

        res.status(200).json({ userExists: true });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;