export default async function fetchDeleteProject(projectId) {
  const requestOptions = {
    cache: 'default',
    credentials: 'same-origin',
    method: 'DELETE',
    mode: 'cors',
  }

  const response = await fetch(`/api/v1/projects/${projectId}`, requestOptions)

  if (!response.ok) {
    throw new Error('Could not delete project')
  }
}
