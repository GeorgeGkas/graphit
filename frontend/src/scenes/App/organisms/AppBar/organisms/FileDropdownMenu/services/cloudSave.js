export default async function cloudSave(graph, selectProject, projectName) {
  const bodyBlob = new Blob(
    [
      JSON.stringify(
        {
          algorithm: 'Dijkstra',
          content: JSON.stringify(graph),
          name: projectName.trim(),
        },
        null,
        2,
      ),
    ],
    {
      type: 'application/json',
    },
  )

  const requestOptions = {
    body: bodyBlob,
    cache: 'default',
    credentials: 'same-origin',
    method: 'POST',

    mode: 'cors',
  }

  try {
    const res = await fetch('/api/v1/projects', requestOptions)

    if (!res.ok) {
      return false
    }

    const data = await res.json()

    selectProject(data)
    return true
  } catch (e) {
    return false
  }
}
