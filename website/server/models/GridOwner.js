import mongoose from "mongoose";

const GridOwnerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
        max: 10,
    },
},{timestamps: true});

const GridOwner = mongoose.model("User",GridOwnerSchema );
export default GridOwner;