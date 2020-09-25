const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: String,
  artist: String,
  coverImage: String,
  videoId: String,
  dateOnChart: String,
  yearOnChart: Number,
  rank: Number,
  type: String,
  likeCount: Number,
  usersWhoLike: [],
});

// On the model method of a mongoose object, pass in the parameter of:
// 1st param: which collection will be used in our database (recall that collections are lowercased and plural in MongoDB)
// 2nd param: which schema will be used to insert objects into the aforementioned collection
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
