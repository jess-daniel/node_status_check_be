const { ManagementClient, AuthenticationClient } = require("auth0");

const Management = new ManagementClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: "read:users update:users create:users delete:users",
});

const auth0 = new AuthenticationClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

module.exports = {
  Management,
  auth0,
};
