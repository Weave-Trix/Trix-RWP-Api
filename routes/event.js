import { db } from "../firebase-config.js";
import express from 'express';
import {
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    query,
    orderBy,
    limit,
    where
} from "firebase/firestore";
import { Event, eventConverter } from "../models/Event.js";
import { verifyTokenArtist } from "./verifyToken.js";

const router = express.Router();
const eventsCollectionRef = collection(db, "events").withConverter(eventConverter);

// Create
router.post("/", (req, res) => {
    const createEvent = async () => {
        console.log("creating with body: " + req.body)
        await addDoc(eventsCollectionRef,
            req.body
        );
    }
    try {
        createEvent();
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Read
router.get("/find/:eventId", async (req, res) => {
    try {
        const docRef = doc(db, "events", req.params.eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Event found:", docSnap.data().username);
        } else {
            console.log("No such event!");
        }
        const { ...others } = docSnap.data();
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})




// Read Billboard Content
router.get("/billboard/", async (req, res) => {
    const webQuery = req.query.name;
    console.log("read billboard: " + webQuery)
    try {
        const q = query(collection(db, "events"), where("billboard", "array-contains", webQuery))
        console.log("q setup success")
        const docSnap = await getDocs(q);
        console.log("docSnap success")
        // reformat json into list
        const formatList = [];
        docSnap.forEach((doc) => {
            formatList.push({ id: doc.id, ...doc.data() })
        });
        console.log(formatList)
        res.status(200).json(formatList);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Read All
router.get("/", async (req, res) => {
    console.log("here read all")
    const webQuery = req.query.limit;
    try {
        const q = webQuery ?
            query(collection(db, "events"), orderBy("title", "asc"), limit(6))
            : query(collection(db, "events"), orderBy("title", "asc"));
        const userList = await getDocs(q);

        // reformat json into list
        const formatList = [];
        userList.forEach((doc) => {
            formatList.push({ id: doc.id, ...doc.data() })
        });

        res.status(200).json(formatList);
    } catch (err) {
        res.status(500).json(err);
    }
})


export default router;