export default function localDownload(graph) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(graph, null, 2)),
  )
  element.setAttribute('download', 'editor.json')

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
