function validateTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

module.exports = { validateTitle };
