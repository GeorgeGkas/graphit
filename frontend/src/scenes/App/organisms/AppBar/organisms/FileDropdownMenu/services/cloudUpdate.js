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
    body: bodyBlob,
    cache: 'default',
    credentials: 'same-origin',
    method: 'PATCH',

    mode: 'cors',
  }

  fetch(`/api/v1/projects/${projectId}`, requestOptions).then(res => {
    if (res.ok) {
      toast.success('Project updated successfully')
    } else {
      toast.error('Could not update project')
    }
  })
}
