class User {
    constructor (username, email, password, isAdmin, isArtist) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isArtist = isArtist;
    }
    toString() {
        return this.username + ', ' + this.email + ', ' + this.password + ', ' + + this.isAdmin + ' admin, ' + this.isArtist + ' artist, '
    }
}

//Firestore data converter
const userConverter = {
    toFirestore: (user) => {
        return {
            username: user.username,
            email: user.email,
            password: user.password,
            isAdmin: false,
            isArtist: false,
            myTicketList: [],
            myWishList: [],
            artistEventList: [],
        };
    },
    fromFireStore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.username, data.email, data.password, data.isAdmin, data.isArtist);
    }
}

export {User, userConverter};