import axios from 'axios'

export default async function cloudUpdate(id, data, token) {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_ENDPOINT}/v1/projects/${id}`,
      data,
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
