require("dotenv").config({
  path: ".env",
})

module.exports = {
  siteMetadata: {
    title: `SJ Tyre Solutions Logger`,
    description: `Logging application for all trucks & drivers`,
    author: `@stevegriesel`,
  },
  plugins: [
    {
      resolve: "gatsby-firesource",
      options: {
        credential: {
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        },
        types: [
          {
            type: "Truck",
            collection: "trucks",
            map: doc => ({
              brand:doc.brand,
              comments:doc.comments,
              condition: doc.condition,
              date:doc.date,
              datesignoff:doc.datesignoff,
              driversignoff:doc.driversignoff,
              endtime:doc.endtime,
              imageUrl:doc.imageUrl,
              odo:doc.odo,
              pressure:doc.pressure,
              registration: doc.registration,
              replacement:doc.replacement,
              starttime:doc.starttime,
              techniciansignoff: doc.techniciansignoff,
              thread: doc.thread,
              threadpattern: doc.threadpattern,
              torquewheelnuts: doc.torquewheelnuts,
              trackingno: doc.trackingno,
              tyremovementinorder: doc.tyremovementinorder,
              driver___NODE: doc.driver.id,
            }),
          },
          {
            type: "Driver",
            collection: "drivers",
            map: doc => ({
              name: doc.name,
            }),
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Truck',
        imagePath: 'imageUrl',
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
