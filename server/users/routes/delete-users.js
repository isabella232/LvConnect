const { hasRoleInList, hasScopeInList } = require('../middlewares');
const { params } = require('./user-validation');

module.exports = {
  method: 'DELETE',
  path: '/users/{user}',
  config: {
    pre: [hasScopeInList('users:delete'), hasRoleInList(['rh', 'board'])],
    validate: {
      params,
    },
  },
  handler(req, res) {
    const { User } = req.server.plugins.users.models;

    const userPromise = User
      .remove({ _id: req.params.user })
      .exec()
      .then(() => ({ deleted: true }));

    res(userPromise);
  },
};
