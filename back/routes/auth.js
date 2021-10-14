const router = require("express").Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISER USER
router.post("/register", async (req, res) => {
    
    const user = req.body;

    try {
        // check if email or username already exists
        const [ rows ] = await pool.execute(`
            SELECT username, email 
            FROM users 
            WHERE username = ? or email = ?
            ;
        `, [ user.username, user.email ]);
        
        if (rows.length > 0) {
            if (rows[0].email === user.email) 
                return res.status(409).json({ 
                    message:"Email already in use!",
                    errorCode: 1
                });
            
            return res.status(409).json({ 
                message:"Username already in use!",
                errorCode: 0
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // insert user in database
        await pool.execute(`
                INSERT INTO users ( username, email, password, name ) 
                VALUES ( ?, ?, ?, ? )
                ;
        `, [ user.username, user.email, hashedPassword, user.name ]);

        const [ newUser ] = await pool.execute(`
            SELECT * 
            FROM users
            WHERE username = ?
            ;
        `,  [user.username]);

        const { password, ...rest } = newUser[0];
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
        
        res.status(200).json({ message: "User successfully registered.", user: rest, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong.", error: err });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const [ rows ] = username 
            ? await pool.execute("SELECT * FROM users WHERE username = ?;", [ username ])
            : await pool.execute("SELECT * FROM users WHERE email = ?;", [ email ]);
        
        if (rows.length === 0) {
            res.status(404).json({ message: "User not found." });
            return;
        }
    
        let validPassword = await bcrypt.compare(password, rows[0].password);
        if (!validPassword)
            return res.status(403).json({ 
                message: "Password is not correct." 
            });
        
        const token = username 
            ? jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
            : jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        {
            const { password, ...user } = rows[0];
            res.status(200).json({ message: "Login successful.", user, token });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong.", error: err });
    }
}); 

module.exports = router;