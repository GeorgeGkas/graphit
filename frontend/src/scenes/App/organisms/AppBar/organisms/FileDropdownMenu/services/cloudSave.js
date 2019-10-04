import axios from 'axios'

export default async function cloudSave(data, token) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/v1/projects`,
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
