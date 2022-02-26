class Ticket {
    constructor(paymentId, userId) {
        this.paymentId = paymentId;
        this.userId = userId;
    }
}

const ticketConverter = {
    toFireStore: (ticket) => {
        return {
            paymentId: ticket.paymentId,
            userId: ticket.userId,
        }
    },
    fromFireStore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Ticket(data.paymentId, data.userId);
    }
}

export { Ticket, ticketConverter };