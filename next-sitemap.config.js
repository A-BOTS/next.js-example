const frontServerUrl = require('./config').frontServerUrl;

module.exports = {
  siteUrl: frontServerUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/user']
      },
    ],
    additionalSitemaps: [
      'https://a-bots.com/sitemap-0.xml'
    ],
  }
}