const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

// const templateEngine = handlebars.create()

// const getPartialTemplate = template => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve(`./src/modules/email/templates/${template}.hbs`), (err, buffer) => {
//       if (err) return reject(err)
//       return resolve(buffer.toString())
//     })
//   })
// }

// const getBaseTemplate = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve('./src/modules/email/templates/index.hbs'), (err, buffer) => {
//       if (err) return reject(err)
//       return resolve(buffer.toString())
//     })
//   })
// }

// const registerPartial = () => {
//   return getPartialTemplate('password-reset').then(stringBuffer => {
//     return templateEngine.registerPartial('container', stringBuffer)
//   })
// }

// const compileTemplate = () => {
//   const context = {
//     title: 'FCUC-HRMS',
//     subject: 'Password Reset Request',
//     user: 'Howard Chang',
//     link: 'https://www.google.com'
//   }

//   registerPartial()
//   getBaseTemplate().then(stringBuffer => {
//     const compiled = templateEngine.compile(stringBuffer)
//     console.log(compiled(context))
//   })
// }

module.exports = class Email {
  constructor(context, template) {
    this.context = context
    this.template = template
    this.templateEngine = handlebars.create()
  }

  getPartialTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(`./src/modules/email/templates/${this.template}.hbs`),
        (err, buffer) => {
          if (err) return reject(err)
          return resolve(buffer.toString())
        }
      )
    })
  }

  getBaseTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve('./src/modules/email/templates/index.hbs'), (err, buffer) => {
        if (err) return reject(err)
        return resolve(buffer.toString())
      })
    })
  }

  registerPartial() {
    return this.getPartialTemplate().then(stringBuffer => {
      return this.templateEngine.registerPartial('container', stringBuffer)
    })
  }

  compile() {
    return this.registerPartial().then(() => {
      return this.getBaseTemplate().then(stringBuffer => {
        const compiled = this.templateEngine.compile(stringBuffer)
        return compiled(this.context)
      })
    })
  }
}

// const emailObject = new Email(
//   {
//     title: 'FCUC-HRMS',
//     subject: 'Password Reset Request',
//     user: 'Howard Chang',
//     link: 'https://www.google.com'
//   },
//   'password-reset'
// )

