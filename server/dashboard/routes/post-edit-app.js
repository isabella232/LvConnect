const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/dashboard/apps/edit/{id}',
  config: {
    auth: 'session',
    validate: {
      payload: Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(255).required(),
        allowedScopes: Joi.array().items(Joi.string()).single(),
        redirectUri: Joi.string().uri().required(),
      }),
      failAction: (req, res, src, error) => {
        req.server.log('info', src);
        req.server.log('info', error);
        const { Application } = req.server.plugins.oauth.models;

        Application.findById(req.params.id)
          .then((app) => {
            res.view('create-app', {
              pageTitle: 'Edit app',
              app,
              error,
              editMode: true,
              validScopes: req.server.plugins.oauth.validScopes,
            });
          });
      },
    },
  },
  handler(req, res) {
    const { Application } = req.server.plugins.oauth.models;

    Application.findById(req.params.id)
      .then((app) => {
        if (!app) {
          return res.redirect('/dashboard/apps');
        }

        return Object
          .assign(app, {
            name: req.payload.name,
            description: req.payload.description,
            allowedScopes: req.payload.allowedScopes,
            redirectUris: [req.payload.redirectUri],
          })
          .save()
          .then(() => res.redirect('/dashboard/apps'))
          .catch(() => res.view('create-app', {
            pageTitle: 'Edit app',
            user: req.auth.credentials,
            app,
            editMode: true,
            validScopes: req.server.plugins.oauth.validScopes,
          }));
      });
  },
};
