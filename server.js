const { parse } = require("csv-parse");
const fs = require("fs");
const results = [];

// filter planets

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["kol_insol"] < 1.11 && planet['koi_prad'] < 1.6
  );
}

// reading data from csv file

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) {
      results.push(data);
    }
  })
  .on("err", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(results.map((planet) => (
        planet['kepler_name']
    )));
    console.log(`${results.length} habitable planets found`);
    console.log("am done");
  });
