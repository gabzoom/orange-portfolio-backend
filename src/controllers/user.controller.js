const hello = (req, res) => {
  const message = 'Hello World';

  res.send({ message });
};

module.exports = { hello };
