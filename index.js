import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL = `https://api.openweathermap.org/data/2.5/weather?lat=43.77&lon=-79.46&appid=729482a32d7e822f3170b09f87013c11`;
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
 
  try {
      const result = await axios.get(URL);
      res.render("index.ejs", {
          weather: result.data.weather[0].main, 
          description: result.data.weather[0].description,
        
      });
  } catch (error) {
    res.status(500).send("Error retrieving weather data.");
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  