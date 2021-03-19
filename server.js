const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_ATLAS,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB Atlas CONECTADO com sucesso!');
    }
  }
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, function () {
  console.log(`Server runing on port ${port}`);
});
