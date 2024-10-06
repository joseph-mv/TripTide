const db = require('../config/connection')
// const promise = require("promise");

const collection = require("../config/collection");
const { ObjectId } = require('mongodb');


module.exports = {
    addItinerary:(itinerary)=>{
    return new Promise(async (resolve, reject) => {
        await db.get().collection(collection.ITINERARY_Collection).insertOne(itinerary).then((data)=>{
            resolve(true)
            // console.log((data))
        }).catch((err)=>{
            reject(err)
            // console.log((err))
        })
    })
    },
    deleteItinerary:(id)=>{
        return new Promise(async (resolve, reject)=>{
            await db.get().collection(collection.ITINERARY_Collection).deleteOne({_id:new ObjectId(id)}).then((data)=>{
                resolve(true)
                // console.log((data))
            }).catch((err)=>{
                reject(err)
                // console.log((err))
            })
        })
    }
}