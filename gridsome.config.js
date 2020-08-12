require('dotenv').config()
const path = require('path')

module.exports = {
  siteName: 'Jasmo2 Portfolio',
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: '@alariclg/gridsome-source-prismic',
      options: {
        url: `https://${process.env.PRISMIC_REPOSITORY_NAME}.prismic.io`,
        fieldName: 'prismicio',
        typeName: 'prismicio',

        headers: {
          'Prismic-Ref': process.env.PRISMIC_API_REF, // useMasterRef will overload this line
          Authorization: `Token ${process.env.PRISMIC_API_TOKEN}`,
        },
        useMasterRef: false
      },
    },
  ],
}
