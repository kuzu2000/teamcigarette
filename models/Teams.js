const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema(
  {
    teamType: {type: String},
    teamLogo: {type:String},
    backgroundCover: {type:String},
    players: [
      {
        name: { type: String, required: true },
        type: { type: String },
        image: { type: String },
        desc: { type: String },
        currentTeam: { type: String },
        age: { type: Number },
        country: { type: String },
        twitterLink: { type: String },
        twitterName: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teams', teamsSchema);
