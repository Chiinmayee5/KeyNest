import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

let db;

export const setDatabase = (database) => {
    db = database;
};

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // Get users collection
        const usersCollection = db.collection("users");

        // Check if email already exists
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        // Save user
        await usersCollection.insertOne(newUser);

        return res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password."
            });
        }

        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({ email });

        if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found."
    });
}

// Compare entered password with hashed password
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid password."
    });
}

const token = jwt.sign(
  {
    id: user._id.toString(),
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);
return res.json({
    success: true,
    message: "Login successful!",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
export default router;