export default async function fetchProjectList(profileId) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
  }

  const response = await fetch(
    `/api/v1/authors/${profileId}/projects`,
    requestOptions,
  )

  if (!response.ok) {
    throw new Error('Gould not fetch project list.')
  } else {
    const projectList = await response.json()
    return projectList
  }
}
