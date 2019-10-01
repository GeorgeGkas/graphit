export default async function fetchProject(projectId) {
  const requestOptions = {
    cache: 'default',
    credentials: 'same-origin',
    method: 'GET',
    mode: 'cors',
  }

  const response = await fetch(`/api/v1/projects/${projectId}`, requestOptions)

  if (!response.ok) {
    throw new Error('Could not fetch project.')
  } else {
    let project = await response.json()
    return project
  }
}
