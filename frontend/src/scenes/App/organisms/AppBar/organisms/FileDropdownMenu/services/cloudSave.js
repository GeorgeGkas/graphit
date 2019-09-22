import { toast } from 'react-toastify'

export default function cloudSave(graph, selectProject) {
  let projectName = prompt('Project name')

  if (!projectName || !projectName.trim()) {
    return
  }

  const bodyBlob = new Blob(
    [
      JSON.stringify(
        {
          content: JSON.stringify(graph),
          name: projectName.trim(),
          algorithm: 'Dijkstra',
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
    method: 'POST',
    body: bodyBlob,
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
  }

  fetch('/api/v1/projects', requestOptions).then(res => {
    if (res.ok) {
      res.json().then(id => {
        selectProject(id)
        toast.success('Project saved successfully')
      })
    } else {
      toast.error('Could not save project')
    }
  })
}
