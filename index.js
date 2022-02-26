import express from 'express';
const app = express();
import dotenv from 'dotenv';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import eventRoute from "./routes/event.js"
import ticketRoute from "./routes/ticket.js"
import stripeRoute from "./routes/stripe.js"
import { Timestamp } from 'firebase/firestore';
import cors from 'cors';

dotenv.config();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/checkout", stripeRoute);


const jsDate = new Date('2022-02-12T03:24:00');
const testTime = Timestamp.fromDate(new Date(jsDate));

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend server is running");
    console.log(jsDate);
    console.log(testTime.toString());
});