const validateResource = () => {
  return (req, res, next) => {
    const { name, link, user_id } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Resource requires a name property' });
    } else if (!link) {
      res.status(400).json({ message: 'Resource requires a link property' });
    } else if (!user_id) {
      res.status(400).json({ message: 'Resource requires a user_id property' });
    } else {
      next();
    }
  };
};

module.exports = validateResource;
