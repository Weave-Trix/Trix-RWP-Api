# firestore-timestamp-converter

[![NPM version](https://badge.fury.io/js/firestore-timestamp-formatter.svg)](https://npmjs.org/package/firestore-timestamp-formatter)

> Firestore WithConverter method to auto convert from default firestore timestamp to javascript date object

## Description

While working on a firestore project, I figured I needed to manually convert the firestore timestamp response to actual javascript date object before they become usable, the problem with this is that even if I have an array of data, I need to always loop through and manually convert to javascript date object using the `toDate` method. This can be time-consuming.

## How To Use

```js
import TimestampConverter from 'firestore-timestamp-formatter';

const response = await db
  .collection("user")
  .doc(id)
  .withConverter(TimestampConverter))
  .get();

The `response` will now contain a valid javascript date object instead of the default firestore timestamp.
```

## Installation

Use your favourite package manager to add the package to your package.json

```sh
npm i firestore-timestamp-formatter
```
