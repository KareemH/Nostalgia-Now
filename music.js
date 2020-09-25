// const { getChart } = require("billboard-top-100");
// const scrapeYt = require("scrape-yt");
// // const Song = require("./models/songModel");
// // const mongoose = require("mongoose"); // For MongoDB

// // mongoose.connect(
// //   process.env.MONGODB_CONNECTION_STRING,
// //   {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true,
// //   },
// //   (err) => {
// //     if (err) throw err;
// //     console.log("MongoDB connection established");
// //   }
// // );

// let today = new Date();
// let dd = String(today.getDate()).padStart(2, "0");
// let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
// let yyyy = today.getFullYear();

// // // today = mm + '/' + dd + '/' + yyyy;
// // // today = `${yyyy}-${mm}-${dd}`;

// // // Function to add a song to the database
// // async function addSong(
// //   title,
// //   artist,
// //   coverImage,
// //   dateOnChart,
// //   yearOnChart,
// //   rank
// // ) {
// //   // Making sure the search actually returned somethng
// //   const maxRetryCount = 5;

// //   var retryCount = 1;
// //   var results = [];

// //   while (results.length == 0 && retryCount < maxRetryCount) {
// //     results = await scrapeYt.search(
// //       artist + " " + title + " " + "official music video"
// //     );
// //     retryCount++;
// //   }
// //   //   End of makng sure search returned something

// //   //console.log(results);
// //   let videoURLId = results[0].id;
// //   let image = results[0].thumbnail;

// //   // Constructing a new Song object using a song's info from billboard
// //   const newSong = new Song({
// //     title: title,
// //     artist: artist,
// //     coverImage: image,
// //     videoId: videoURLId,
// //     dateOnChart: dateOnChart,
// //     yearOnChart: yearOnChart.split("-")[0],
// //     rank: rank,
// //     type: "Song",
// //     likeCount: 0,
// //     usersWhoLike: [],
// //   });

// //   // Saving the song onto the database
// //   newSong.save().then((song) => console.log(song));
// // }

// // // Looping through the years 2001 to 2011
// // for (let year = 2005; year <= 2007; year++) {
// //   // Making the date in YYYY-MM-DD format
// //   // today = mm + '/' + dd + '/' + yyyy;
// //   resolved_date = `${year}-${mm}-${dd}`;
// //   // getChart using resolved_date
// //   getChart("hot-100", resolved_date, (err, chart) => {
// //     if (err) console.log(err);

// //     // First 20 for every year get the best songs
// //     for (let i = 0; i < 20; i++) {
// //       console.log(chart.songs[i]);
// //       addSong(
// //         chart.songs[i].title,
// //         chart.songs[i].artist,
// //         chart.songs[i].cover,
// //         chart.week,
// //         chart.week,
// //         chart.songs[i].rank
// //       );
// //     }
// //   });
// // }

// // // date format YYYY-MM-DD
// resolved_date = `${2007}-${mm}-${dd}`;
// getChart("hot-100", resolved_date, (err, chart) => {
//   if (err) console.log(err);
//   //   console.log(`This Week: ${chart.week}`); // prints the week of the chart in the date format YYYY-MM-DD
//   //   console.log(chart.previousWeek.url) // prints the URL of the previous week's chart
//   console.log(`Previous Week: ${chart.previousWeek.date}`); // prints the date of the previous week's chart in the date format YYYY-MM-DD
//   console.log(`This Week: ${chart.week}`); // prints the week of the chart in the date format YYYY-MM-DD
//   //   console.log(chart.nextWeek.url) // prints the URL of the next week's chart

//   console.log(`Next Week: ${chart.nextWeek.date}`); // prints the date of the next week's chart in the date format YYYY-MM-DD
//   console.log(chart.songs); // prints array of top 100 songs for week of August 27, 2016
//   //   console.log(chart.songs[3]); // prints song with rank: 4 for week of August 27, 2016
//   //   console.log(chart.songs[0].title); // prints title of top song for week of August 27, 2016
//   //   console.log(chart.songs[0].artist); // prints artist of top songs for week of August 27, 2016
//   //   console.log(chart.songs[0].rank) // prints rank of top song (1) for week of August 27, 2016
//   //   console.log(chart.songs[0].cover) // prints URL for Billboard cover image of top song for week of August 27, 2016
// });
