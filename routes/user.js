import { db } from "../firebase-config.js";
import express from 'express';
import { verifyTokenAdmin, verifyTokenAuth } from "./verifyToken.js";
import cryptoJs from "crypto-js";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, limit, arrayUnion } from "firebase/firestore";

const router = express.Router();

// Create user refer to auth.js

// Read
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const docRef = doc(db, "users", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("User found:", docSnap.data().username);
        } else {
            console.log("No such user!");
        }
        const { password, ...others } = docSnap.data();
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Read All
router.get("/", verifyTokenAdmin, async (req, res) => {
    const webQuery = req.query.new;
    try {
        const q = webQuery ?
            query(collection(db, "users"), orderBy("username", "asc"), limit(2))
            : query(collection(db, "users"), orderBy("username", "asc"));
        const userList = await getDocs(q);

        // reformat json into list
        const formatList = [];
        userList.forEach((doc) => {
            formatList.push({ id: doc.id, ...doc.data() })
        });

        console.log("hihi ruka chan");
        console.log(formatList);
        res.status(200).json(formatList);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update
router.put("/:id", verifyTokenAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.PW_SEC
        ).toString()
    }
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

const updateUser = async (id, body) => {
    const userDoc = doc(db, "users", id);
    const newFields = body;
    await updateDoc(userDoc, newFields);
    return userDoc;
}

// Delete
router.delete("/:id", verifyTokenAuth, async (req, res) => {
    try {
        const userDoc = doc(db, "users", req.params.id);
        await deleteDoc(userDoc);
        res.status(200).json("Deleted " + req.params.id);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
