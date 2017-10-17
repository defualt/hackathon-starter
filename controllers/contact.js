const nodemailer = require('nodemailer');

module.exports = function (ns) {
  const toReturn = {};
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  /**
   * GET /contact
   * Contact form page.
   */
  toReturn.getContact = (req, res) => {
    res.render('contact', {
      title: 'Contact'
    });
  };

  /**
   * POST /contact
   * Send a contact form via Nodemailer.
   */
  toReturn.postContact = (req, res) => {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('message', 'Message cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect(ns('/contact'));
    }

    const mailOptions = {
      to: 'your@email.com',
      from: `${req.body.name} <${req.body.email}>`,
      subject: 'Contact Form | Hackathon Starter',
      text: req.body.message
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        req.flash('errors', { msg: err.message });
        return res.redirect(ns('/contact'));
      }
      req.flash('success', { msg: 'Email has been sent successfully!' });
      res.redirect(ns('/contact'));
    });
  };
  return toReturn;
};