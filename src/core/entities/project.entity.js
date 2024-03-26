const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    debut: { type: Date, required: true },
    fin: { type: Date, required: true },
    details: { type: String, required: true },
    filename:{type:String}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
