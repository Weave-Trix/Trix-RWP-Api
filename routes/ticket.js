import { db } from "../firebase-config.js";
import express from 'express';
import { verifyTokenAdmin, verifyTokenAuth } from "./verifyToken.js";
import { collection, addDoc, arrayUnion, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import { Ticket, ticketConverter } from "../models/Ticket.js";

const router = express.Router();
const ticketCollectionRef = collection(db, "tickets");
// Create
router.post("/forge/:eventId", async (req, res) => {
    console.log("forging ticket");
    const createTicket = async () => {
        console.log("forging ticket for event, where event id => " + req.params.eventId)
        await addDoc(ticketCollectionRef,
            {
                event: req.body.event,
                payment: req.body.payment,
                userId: req.body.userId,
            }
        ).then(docRef => {
            console.log(docRef.id);
            try {
                updateUserTicketList(req.body.userId, docRef.id)
                console.log("Ticket successfully assigned to user");
            } catch (err) {
                console.log("Ticket created but failed to assign to user");
            }

            try {
                // req.params.id stores the eventId
                updateEventSoldTicket(req.params.eventId, docRef.id)
                console.log("Ticket successfully assigned to event");
            } catch (err) {
                console.log("Ticket created but failed to assign to event");
            }
        });
    }
    try {
        createTicket();
        console.log(req.body.userId + "-userId, " + req.params.id + "-eventId, ticket added.")
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
});

// assign ticket to user
const updateUserTicketList = async (userId, ticketId) => {
    console.log("assigning ticket to user...");
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { myTicketList: arrayUnion(ticketId) });
}

// assign ticket to event
const updateEventSoldTicket = async (eventId, ticketId) => {
    console.log("assigning ticket to event...")
    const eventDoc = doc(db, "events", eventId);
    await updateDoc(eventDoc, { soldTicketList: arrayUnion(ticketId) });
}


// Read All
router.get("/find/:userId", async(req,res) => {
    try{
        console.log("api received request to find tickets for : " + req.params.userId);
        const q = query(ticketCollectionRef, where("userId", "==", req.params.userId));
        const querySnapshot = await getDocs(q);
        const ticketList = [];
        querySnapshot.forEach((doc) => {
            ticketList.push({ticketId: doc.id, ...doc.data()})
        });
        res.status(200).json(ticketList);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
