<result>
  <section if={ isShown }>
    <p>{ result.statusCode } { result.statusText }</p>
    <ul>
      <li each={ value, key in result.header }>{ key }: { value }</li>
    </ul>
    <pre><code ref='codeblock'></code></pre>
  </section>

  <script>
    this.isShown = false
    this.result = {
      statusText: '',
      statusCode: null,
      header: {},
      body: null
    }

    this.updateHighlight = () => {
      Object.keys(this.result.header)
        .filter(key => key.toLowerCase() === 'content-type')
        .forEach(key => {
          const value = this.result.header[key]
          const body = this.result.body
          if (value.startsWith('text/html')) {
            this.refs.codeblock.innerHTML = hljs.highlight('html', body.trim()).value
          } else if (value.startsWith('text/css')) {
            this.refs.codeblock.innerHTML = hljs.highlight('css', body.trim()).value
          } else if (value.startsWith('application/javascript')) {
            this.refs.codeblock.innerHTML = hljs.highlight('javascript', body.trim()).value
          } else if (value.startsWith('application/json')) {
            this.refs.codeblock.innerHTML = hljs.highlight('json', JSON.stringify(body)).value
          }
        })
    }

    observer.on(consts.events.results.update, result => {
      this.isShown = true
      this.result = result
      this.update()
      this.updateHighlight()
    })

    observer.on(consts.events.results.clear, () => {
      this.isShown = false
      this.update()
    })
  </script>
</result>
