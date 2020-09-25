const express = require("express"); // Including the express module in this file
const mongoose = require("mongoose"); // For MongoDB
const cors = require("cors");
require("dotenv").config();

//---- Billboard stuff --------//
// const { getChart } = require("billboard-top-100");
// const scrapeYt = require("scrape-yt");
// const Song = require("./models/songModel");
//----------------------------//

// Set up express
const app = express();
app.use(express.json()); // Using the JSON body parser
app.use(cors());

// Setting up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

//------------- Billboard stuff --------------------//
// let today = new Date();
// let dd = String(today.getDate()).padStart(2, "0");
// let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
// let yyyy = today.getFullYear();

// // today = mm + '/' + dd + '/' + yyyy;
// // today = `${yyyy}-${mm}-${dd}`;

// // Function to add a song to the database
// async function addSong(
//   title,
//   artist,
//   coverImage,
//   dateOnChart,
//   yearOnChart,
//   rank
// ) {
//   // Making sure the search actually returned somethng
//   const maxRetryCount = 5;

//   var retryCount = 1;
//   var results = [];

//   while (results.length == 0 && retryCount < maxRetryCount) {
//     results = await scrapeYt.search(
//       artist + " " + title + " " + "official music video"
//     );
//     retryCount++;
//   }
//   //   End of makng sure search returned something

//   //console.log(results);
//   let videoURLId = results[0].id;
//   let image = results[0].thumbnail;

//   // Constructing a new Song object using a song's info from billboard
//   const newSong = new Song({
//     title: title,
//     artist: artist,
//     coverImage: image,
//     videoId: videoURLId,
//     dateOnChart: dateOnChart,
//     yearOnChart: yearOnChart.split("-")[0],
//     rank: rank,
//     type: "Song",
//     likeCount: 0,
//     usersWhoLike: [],
//   });

//   // Saving the song onto the database
//   newSong.save().then((song) => console.log(song));
// }

// // Looping through the years 2001 to 2011
// for (let year = 2000; year <= 2011; year++) {
//   // Making the date in YYYY-MM-DD format
//   // today = mm + '/' + dd + '/' + yyyy;
//   resolved_date = `${year}-${mm}-${dd}`;
//   // getChart using resolved_date
//   getChart("hot-100", resolved_date, (err, chart) => {
//     if (err) console.log(err);

//     // First 20 for every year get the best songs
//     for (let i = 0; i < 40; i++) {
//       // console.log(chart.songs[i]);
//       addSong(
//         chart.songs[i].title,
//         chart.songs[i].artist,
//         chart.songs[i].cover,
//         chart.week,
//         chart.week,
//         chart.songs[i].rank
//       );
//     }
//   });
// }
//--------------------------------------------------------//

// Setting up routes middleware
const users = require("./routes/userRouter");
const songs = require("./routes/songRoutes");
app.use("/users", users);
app.use("/songs", songs);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
