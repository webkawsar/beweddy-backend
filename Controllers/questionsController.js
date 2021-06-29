const User = require("../Models/user");
const Question = require("../Models/Question");
const shortid = require("shortid");
const slugify = require("slugify");




exports.createWeddyProfile = async(req, res) => {

    try {

        const { your_firstname,
            your_lastname,
            wedding_registry_feeling,
            want_live_together,
            spouse_firstname,
            spouse_lastname,
            special_day,
            register_other_store,
            how_many_guest,
            excited_to_register,
            enjoy,
            benefit_looking, } = req.body;
    
        const question = new Question({
            your_firstname,
            your_lastname,
            wedding_registry_feeling,
            want_live_together,
            spouse_firstname,
            spouse_lastname,
            special_day,
            register_other_store,
            how_many_guest,
            excited_to_register,
            enjoy,
            benefit_looking,
            slug: slugify(your_firstname + "-" + your_lastname + "-" + spouse_firstname + "-" + spouse_lastname + "-" + "marriage", {
                lower: true
            }),
            
        });
    
        await question.save();
        res.send({ success: true, profile: question });
        
    } catch (error) {
        
        res.status(500).send({ success: false, message: error.message });
    }
};




exports.getDashboardBySlug = (req, res) => {

    const { slug } = req.params;
    Question.findOne({ slug })
        .exec((error, profile) => {
            
            if (error) {
                return res.status(400).json({ error });
            } if (profile) {
                if (profile) res.status(200).json({ profile });
            }
        });
};

exports.getDashboardDetailsById = (req, res) => {
    const { profileId } = req.params;
    Question.findOne({ profileId })
        .exec((error, profile) => {
            if (error) {
                return res.status(400).json({ error });
            } if (profile) {
                if (profile) res.status(200).json({ profile });
            }
        });
};

exports.getDashboardAllData = (req, res) => {
    Question.find({}).exec((error, dashboardData) => {
        if (error) return res.status(400).json({ error });

        if (dashboardData) {
            return res.status(200).json({ dashboardData });
        }
    });
};