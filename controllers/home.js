/**
 * GET /
 * Home page.
 */
module.exports = function (ns) {
  const toReturn = {};
  toReturn.index = (req, res) => {
    res.render('home', {
      title: 'Home'
    });
  };
  return toReturn;
};