const data = {
  info: { name: '章三' },
  get name() {
    return this.info.name
  },
  set name(name) {
    this.info.name = name
  }
}

data.name = 'lisi'
console.log(data.name)
console.log(data.info.name)
