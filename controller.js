module.exports = {
  getUser(req, res, next){
    console.log('im the response from the fetch: ', res)
    next()
  }
}
