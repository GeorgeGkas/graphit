export default async function cloudUpdate(projectId, graph) {
  const bodyBlob = new Blob(
    [
      JSON.stringify(
        {
          content: JSON.stringify(graph),
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
    method: 'PATCH',

    mode: 'cors',
  }

  try {
    const res = await fetch(`/api/v1/projects/${projectId}`, requestOptions)

    if (!res.ok) {
      return false
    }

    return true
  } catch (e) {
    return false
  }
}
