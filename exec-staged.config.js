module.exports = [
  {
    regex: /\.(js|ts)$/,
    commands: ['eslint', 'prettier --write', 'git add'],
  },
];
