const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require('cors')

connectDB();

app.use(express.json({ extended: false }));
app.use(cors())

const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/data", require("./routes/api/data"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is started and Running on port ${PORT}`);
});
