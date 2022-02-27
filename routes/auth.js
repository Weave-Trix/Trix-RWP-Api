import { db } from "../firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import express from 'express';
import { User, userConverter } from "../models/User.js";
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';

const { sign } = jwt;
const router = express.Router();
const usersCollectionRef = collection(db, "users").withConverter(userConverter);

// Register (create user)
router.post("/register", (req, res) => {
    const createUser = async () => {
        await addDoc(usersCollectionRef,
            new User(
                req.body.username,
                cryptoJs.AES.encrypt(req.body.password, process.env.PW_SEC).toString()
            )
        );
    }
    try {
        createUser();
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Login
router.post("/login", (req, res) => {
    const authUser = async () => {
        var foundUser, userId;
        const q = query(collection(db, "users"), where("username", "==", req.body.username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            foundUser = doc.data();
            userId = doc.id;
        });

        //TODO: handle user dne, propose create dummy false user
        if (!foundUser) {
            res.status(401).json("Wrong credentials!");
            return;
        }

        const hashedPassword = cryptoJs.AES.decrypt(
            foundUser.password,
            process.env.PW_SEC
        )

        const realPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
        if (realPassword !== req.body.password) {
            res.status(401).json("Wrong credentials!");
            return;
        }


        const accessToken = sign({
            id: userId,
            isAdmin: foundUser.isAdmin,
            isArtist: foundUser.isArtist
        },

            process.env.JWT_SEC,
            { expiresIn: "100000d" }
        );

        const { password, ...others } = foundUser;
        res.status(200).json({ ...others, accessToken, userId });
    }
    try {
        authUser();
    } catch (err) {
        res.status(500).json(err);
    }
})

export default router;
