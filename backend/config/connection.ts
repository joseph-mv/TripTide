import { MongoClient, Db } from 'mongodb';

interface State {
    db: Db | null;
}

const state: State = {
    db: null
};

export const connect = async function (done: (err?: any) => void) {
    const url = process.env.MONGO_URI;
    if (!url) {
        return done(new Error("MONGO_URI not set"));
    }
    const dbName = 'TripTide';

    try {
        const client = await MongoClient.connect(url);
        // Access the newly created database with the desired name
        state.db = client.db(dbName);
        done();
    } catch (error) {
        console.error("Connection error:", error);
        done(error);
    }
};

export const get = function (): Db {
    if (!state.db) {
        throw new Error("Database not initialized. Call connect first.");
    }
    return state.db;
};

export default { connect, get };
