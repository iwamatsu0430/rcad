<app>
  <project class={ isProjectHidden ? 'project-hidden' : null }></project>
  <main class={ isProjectHidden ? 'project-hidden' : null }>
    <rest></rest>
    <result></result>
  </main>

  <script>
    this.isProjectHidden = false

    observer.on(consts.events.project.show, () => {
      this.isProjectHidden = false
      this.update()
    })

    observer.on(consts.events.project.hide, () => {
      this.isProjectHidden = true
      this.update()
    })
  </script>
</app>
