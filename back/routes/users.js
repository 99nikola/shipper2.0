const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../database");

// update user
router.put("/:username", async (req, res) => {
    
    const username = req.params.username;
    let pass = false;

    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            hashedPass = await bcrypt.hash(req.body.password, salt);
            pass = true;
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    try {
        const { password, ...other } = req.body;

        const fields = Object.keys(other);
        const values = Object.values(other);

        let str = pass 
            ? "password = ?," 
            : "";
        for (let i=0; i<fields.length; i++) str += `${fields[i]} = ?,`;
        str = str.slice(0, -1);
        values.push(username);
        if (pass) values.unshift(hashedPass);

        await pool.execute("SET SQL_SAFE_UPDATES = 0;");
        let sqlInsert = "UPDATE users SET " + str + " WHERE username = ?;";
        const [rows] = await pool.execute(sqlInsert, values);

        if (rows.affectedRows === 0) 
            return res.status(404).json({ message: "User not found." });

        await pool.execute("SET SQL_SAFE_UPDATES = 1;");

        return res.status(200).json({ message: "Account has beend updated." });

    } catch (err) {
        return res.status(500 ).json(err);
    }
});

// delete user
router.delete("/:username", async (req, res) => {
    const username = req.params.username;
    const password = req.body.password;

    try {
        const [rows] = await pool.execute("SELECT password FROM users WHERE username = ?;", [username]);
        if (rows.length == 0)
            return res.status(404).json({ message: "Username not found."});
        const validPassword = await bcrypt.compare(password, rows[0].password);

        if (!validPassword) {
            res.status(403).json({ message: "Wrong password." });
            return;
        }
        await Promise.all([
            pool.execute("DELETE FROM users WHERE username = ?;", [username]),
            pool.execute("DELETE FROM products WHERE seller_un = ?;", [username]),
            pool.execute("DELETE FROM followers WHERE follower_un = ? OR following_un = ?;", [username, username])
        ]);

        res.status(200).json({ message: "Account has beend deleted." });
    } catch (err) {
        res.status(500).json(err);
    }
});

// follow/unfollow a user
router.put("/follow/:username", async (req, res) => {

    try {
        const [ rows ] = await pool.execute("SELECT following_un FROM followers WHERE follower_un = ?;", [req.body.username]);
        for (let i=0; i<rows.length; i++) {
            // if already follows then unfollow
            if (rows[i].following_un === req.params.username) {
                await pool.execute("DELETE FROM followers WHERE following_un = ? AND follower_un = ?;", [req.params.username, req.body.username]);
                return res.status(200).json({ message: "Unfollowed", following: false });
            }
        }

        const [ found ] = await pool.execute("SELECT username FROM users WHERE username = ?;", [req.body.username]);
        if (found.length === 0) 
            return res.status(404).json({ message: "Username not found!" });

        await pool.execute("INSERT INTO followers ( follower_un, following_un ) VALUES ( ?, ?);", [req.body.username, req.params.username]);

        return res.status(200).json({ message: "Followed", following: true });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/checkFollow", async (req, res) => {
    try {
        const { follower_un, following_un } = req.query;
        const [ rows ] = await pool.execute(`
            SELECT following_un 
            FROM followers 
            WHERE follower_un = ?;`, 
            [follower_un]);

        for (let i=0; i<rows.length; i++) {
            if (rows[i].following_un === following_un) {
                return res.status(200).json({ following: true });
            }
        }

        res.status(200).json({ following: false });
    } catch (error){
        res.status(500).json({ error });
    }
});

router.get("/followings/:username", async (req, res) => {
    
    try {
        let sql =  `SELECT *
                    FROM users u
                    JOIN followers f
                        ON u.username = f.following_un
                    WHERE f.follower_un = ?
                    ;`
        const [ rows ] = await pool.execute(sql, [req.params.username]);
        
        const followings = rows.map(item => {
            const {password, follower_un, following_un, ...other} = item;
            return other;
        });

        res.status(200).json( { followings: followings, isEmpty: rows.length===0 });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/followers/:username", async (req, res) => {
    
    try {
        let sql =  `SELECT *
                    FROM users u
                    JOIN followers f
                        ON u.username = f.follower_un
                    WHERE f.following_un = ?
                    ;`
        const [ rows ] = await pool.execute(sql, [req.params.username]);
        
        const followings = rows.map(item => {
            const {password, follower_un, following_un, ...other} = item;
            return other;
        });

        res.status(200).json( { followers: followings, isEmpty: rows.length===0 });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/currentUser", async (req, res) => {
    try {
        const [ rows ] = await pool.execute(
           `SELECT * 
            FROM users 
            WHERE username = ?;`,
            [ req.username ]);

        if (rows.length === 0) 
            return res.status(404).json({ message: "Username not found." });

        const {password, ...user} = rows[0];

        return res.status(200).json({ user });

    } catch (err) {
        res.status(500).json(err);
    }
    
}); 

module.exports = router;