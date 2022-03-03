class User {
    constructor (username, password) {
        this.username = username;
        this.password = password;
    }
    toString() {
        return this.username + ', ' + this.password
    }
}

//Firestore data converter
const userConverter = {
    toFirestore: (user) => {
        return {
            username: user.username,
            password: user.password,
            isAdmin: false,
            isArtist: false,
            myTicketList: [],
        };
    }
}

export {User, userConverter};