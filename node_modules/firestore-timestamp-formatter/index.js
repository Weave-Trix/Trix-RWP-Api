const transcode = (data) => {
  return Object.keys(data).reduce((accumulator, key) => {
    if (data[key].constructor.name === "Timestamp") {
      accumulator[key] = data[key].toDate();
    } else if (Array.isArray(data[key])) {
      accumulator[key] = data[key].map(transcode);
    } else if (typeof data[key] === "object") {
      accumulator[key] = transcode(data[key]);
    } else {
      accumulator[key] = data[key];
    }

    return accumulator;
  }, {});
};

const TimestampFormatter = {
  toFirestore(documentData) {
    return documentData;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const transcodedData = transcode(data);

    return transcodedData;
  },
};

module.exports = TimestampFormatter;
