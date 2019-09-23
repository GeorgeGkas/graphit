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
