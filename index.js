import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://restcountries.com/v3.1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { 
    content: "Write the the name of the contry or the capital. press the button according to the information you are looking for",
 });
});



app.post("/capital", async (req, res) => {
  const CountryName = req.body.country;
  
  try {
    const result = await axios.get(API_URL + "/name/" + CountryName);
    res.render("index.ejs", {  content: "The capital of " + result.data[0].name.common+ " is "+ result.data[0].capital });
  } catch (error) {
    res.render("index.ejs", { content: "Sorry, there is no country with this name" });
  }
});

app.post("/language", async (req, res) => {
  const CountryName = req.body.country;

  try {
    const result = await axios.get (API_URL + "/name/" + CountryName);
    res.render("index.ejs", {  content: JSON.stringify(result.data[0].languages) });
  } catch (error) {
    res.render("index.ejs", { content: "Sorry, there is no country with this name" });
  }

});

app.post("/currency", async (req, res) => {
  const CountryName = req.body.country;
  try {
    const result = await axios.get (API_URL + "/name/" + CountryName);
    res.render("index.ejs", {  content: JSON.stringify(result.data[0].currencies) });
    console.log(JSON.stringify(result.data[0].name.common));
  } catch (error) {
    res.render("index.ejs", { content: "Sorry, there is no country with this name" });
  }
});

app.post("/searchcountrybycapital", async (req, res) => {
  const capitalName = req.body.capital;
  try {
    const result = await axios.get (API_URL + "/capital/" + capitalName);
    res.render("index.ejs", {  content:  result.data[0].capital+ " is the capital of "+ result.data[0].name.common });
    console.log(JSON.stringify(result.data[0].name.common));
  } catch (error) {
    res.render("index.ejs", { content: "Sorry, there is no capital city with this name" });
  }

 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
