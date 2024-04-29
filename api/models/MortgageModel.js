import mongoose from "mongoose";
const mortgageSchema = mongoose.Schema({
    downPayment: {
        required: true,
        type: Number,
    },
    interest: {
        required: true,
        type: Number,
    },
    years: {
        required: true,
        type: Number, 
    },
    loan: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false
    }
}, { ttimestamps: true });

const Mortgage = mongoose.model("Mortgage", mortgageSchema)

export default Mortgage