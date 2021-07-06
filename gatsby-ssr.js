const React = require('react');
const Layout = require('./src/components/layout').default;

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement

exports.wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>
}