const redirectionFilter = function (req, res, next) {
  const theDate = new Date();
  const receivedUrl = `${req.protocol}:\/\/${req.hostname}:${port}${req.url}`;

  if (req.get("X-Forwarded-Proto") === "http") {
    const redirectTo = `https:\/\/${req.hostname}${req.url}`;
    console.log(`${theDate} Redirecting ${receivedUrl} --> ${redirectTo}`);
    res.redirect(301, redirectTo);
  } else {
    next();
  }
};
