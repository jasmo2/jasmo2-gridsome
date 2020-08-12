require('dotenv').config()
const fs = require('fs')
const axios = require('axios')

const saveRef = (envFile, ref) => {
  const envDev = fs.readFileSync(envFile, {
    encoding: 'utf8',
  })

  const replaced = envDev.replace(
    /PRISMIC_API_REF=.*/gm,
    `PRISMIC_API_REF=${ref}`
    )
  console.log('TCL: saveRef -> ref', ref)
  console.log('TCL: saveRef -> replaced', replaced)
  fs.writeFileSync(envFile, replaced)
}

const replace = (envKey) => (result) => {
  const envFile = `./.env`
  let ref = envKey === 'production' ? result[envKey] : result['staging']

  if (envKey === 'staging') {
    ref = result['production']
  }

  saveRef(envFile, ref)
}

let args = process.argv.slice(2)
const primicRepoName= process.env.PRISMIC_REPOSITORY_NAME
const baseUrl = `https://${primicRepoName}.cdn.prismic.io/api/v2`
axios
  .get(baseUrl)
  .then((response) => response.data)
  .then((data) => data.refs)
  .then((refs) => ({
    staging: refs[1].ref,
    production: refs[0].ref,
  }))
  .then((result) => replace(args[0])(result))
  .catch((error) => console.log('Error', error))
