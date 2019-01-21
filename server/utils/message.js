const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, latitude, logitude) => {
  return {
    from,
    url: `http://www.google.com/maps?q=${latitude},${logitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage, generateLocationMessage };
