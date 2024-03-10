const redirectController = (req, res, next) => {
  try {
    const host = req.headers.host;
    if (host.match(/^www\..*/i)) {
      next();
    } else {
      res.redirect(301, `${req.protocol}://www.` + host + req.url);
    }
  } catch (error) {
    console.log("An error has occurred: ", error);
    next(error);
  }
};

module.exports = { redirectController };
