const mongoose = require('mongoose');
const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nbdejour:{type:Number,required:true},
    debut: { type: Date, required: true },
    fin: { type: Date, required: true },
    budget: { type : Number, required: true },
    validateur: { type: String, required: true },
    Projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
