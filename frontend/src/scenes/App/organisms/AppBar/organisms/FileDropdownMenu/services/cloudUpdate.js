import { toast } from 'react-toastify'

export default function cloudUpdate(projectId, graph) {
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
    method: 'PATCH',
    body: bodyBlob,
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
  }

  fetch(`/api/v1/projects/${projectId}`, requestOptions).then(res => {
    if (res.ok) {
      toast.success('Project updated successfully')
    } else {
      toast.error('Could not update project')
    }
  })
}
