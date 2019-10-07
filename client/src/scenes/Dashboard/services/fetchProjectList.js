import axios from 'axios'

export default async function fetchProjectList(token) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/v1/projects/`,
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
