class SampleController {

  foo(req, res) {
    res.json({
      foo: 'bar'
    })
  }

  bar(req, res) {
    res.json({
      baz: 'qax'
    })
  }
}

module.exports = new SampleController()
