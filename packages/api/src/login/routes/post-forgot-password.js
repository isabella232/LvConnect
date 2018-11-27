const Joi = require('joi');
const Boom = require('boom');

module.exports = {
  method: 'POST',
  path: '/forgot-password',
  config: {
    auth: false,
    plugins: {
      crumb: {
        restful: true,
      },
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().required(),
      }),
    },
  },
  async handler(req) {
    const { User } = req.server.plugins.users.models;
    const { email } = req.payload;

    const user = await User.findOne({ email });
    if (!user || user.leftAt < Date.now()) {
      throw Boom.notFound('invalid_email');
    }

    await req.server.plugins.login.resetPassword(user);

    return { ok: true };
  },
};
