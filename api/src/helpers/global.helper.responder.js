class ResponseBuilder {
  constructor(code, msg) {
    this.code = code
    this.msg = msg
  }

  buildResponse() {
    switch (this.code) {
      case 200:
        return { status: 'OK', result: this.msg }
        break
      case 201:
        return { status: 'CREATED', result: this.msg }
        break
      case 400:
        return { status: 'BAD_REQUEST', result: this.msg }
        break
      case 401:
        return { status: 'UNAUTHORIZED', result: this.msg }
        break
      case 403:
        return { status: 'FORBIDDEN', result: this.msg }
        break
      case 404:
        return { status: 'NOT_FOUND', result: this.msg }
        break
      case 500:
        if (process.env.NODE_ENV === 'development') {
          return {
            status: 'INTERNAL_SERVER_ERROR',
            err: {
              name: this.msg.name,
              message: this.msg.message,
              stack: this.msg.stack
            }
          }
        } else return { status: 'INTERNAL_SERVER_ERROR', err: this.msg.toString() }
        break
    }
  }
}

module.exports = () => {
  return (req, res, next) => {
    res.responder = (code, msg) => {
      const response = new ResponseBuilder(code, msg)
      return res.status(code).json(response.buildResponse())
    }
    next()
  }
}
