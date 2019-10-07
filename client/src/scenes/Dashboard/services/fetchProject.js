import axios from 'axios'

export default async function fetchProject(id, token) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/v1/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return res
  } catch (e) {
    return e
  }
}
