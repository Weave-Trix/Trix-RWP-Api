import { Timestamp } from 'firebase/firestore';

class Payment {
    constructor (paymentMethod, userId) {
        this.paymentMethod = paymentMethod;
        this.userId = userId,
        this.paymentTime = Timestamp.now();
    }
}

//Firestore data converter
const paymentConverter = {
    toFirestore: (payment) => {
        return {
            paymentMethod: payment.paymentMethod,
            userId: payment.userId,
            paymentTime: payment.paymentTime,
        }
    }
}

export {Payment, paymentConverter};