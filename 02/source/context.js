module.exports = {
  get url() {
    return this.request.url
  },
  get method() {
    return this.request.method
  },
  set body(val) {
    this.response.body = val
  },
  get body() {
    return this.response.body
  }
}
