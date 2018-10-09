const path = require('path')
const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const { aws } = require(path.resolve('./src/config/default'))

const s3 = new AWS.S3({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey
})

module.exports.requestPresignedUrl = (req, res) => {
  const contentType = req.query.type
  const key = `${req.user.id}/${uuid()}.${contentType.slice(6)}`
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: aws.bucket,
      ContentType: contentType,
      Key: key
    },
    (err, url) => {
      if (!err) {
        return res.responder(200, { key, url })
      }
      return res.responder(500, err)
    } 
  )
}
