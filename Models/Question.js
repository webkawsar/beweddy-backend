const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./user')
const questionSchema = new mongoose.Schema(
    {
        your_firstname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        your_lastname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        wedding_registry_feeling: {
            type: String,
            required: true,
        },
        want_live_together: {
            type: String,
            required: true,
        },
        spouse_firstname: {
            type: String,
            required: true,
            trim: true,
            min: 2,
            max: 20,
        },
        spouse_lastname: {
            type: String,
            required: true,
            trim: true,
            min: 2,
            max: 20,
        },
        special_day: {
            type: String,
        },
        register_other_store: {
            type: String,
        },
        how_many_guest: {
            type: String,
        },
        excited_to_register: {
            type: String,
        },
        enjoy: {
            type: Array,
            required: true,
        },
        benefit_looking: {
            type: String,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        // createdBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Question", questionSchema);
