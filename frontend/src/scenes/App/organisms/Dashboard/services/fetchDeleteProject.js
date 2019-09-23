export default async function fetchDeleteProject(projectId) {
  const requestOptions = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
  }

  const response = await fetch(`/api/v1/projects/${projectId}`, requestOptions)

  if (!response.ok) {
    throw new Error('Could not delete project')
  }
}
