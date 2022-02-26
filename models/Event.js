import { Timestamp } from 'firebase/firestore';

class Event {
    constructor(
        title, description, coverPhoto, startTime, endTime, location, artistId, artist, price, ticketQuantity, billboard, payment
    ) {
        this.title = title;
        this.description = description;
        this.coverPhoto = coverPhoto;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.artistId = artistId;
        this.artist = artist;
        this.price = price;
        this.ticketQuantity = ticketQuantity;
        this.billboard = billboard;
        this.payment = payment;
    }
}

//Firestore data converter
const eventConverter = {
    toFirestore: (event) => {
        console.log("arrived at toFirestore event converter");
        //const jsStartTime = new Date(event.startDate + 'T' + event.startTime + 'Z');
        //const jsEndTime = new Date(event.endDate + 'T' + event.endTime + 'Z');
        return {
            title: event.title,
            description: event.description,
            coverPhoto: event.coverPhoto,
            startTime: Timestamp.fromDate(new Date(event.startTime)),
            endTime: Timestamp.fromDate(new Date(event.endTime)),
            location: event.location,
            artistId: event.artistId,
            artist: event.artist,
            price: Number(event.price),
            ticketQuantity: event.ticketQuantity,
            soldTicketList: [],
            billboard: event.billboard,
            payment: event.payment
        }
    }
}

export { Event, eventConverter };