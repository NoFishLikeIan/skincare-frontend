import ky from 'ky'
import { InstanceResponseType } from '../stores/dataStore'

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000'
const fetchUrl = `${SERVER_URL}/filter-time`

export async function getDataFilter(from: number, to?: number) {
  const body = { from, to }
  const data: InstanceResponseType[] = await ky.get(fetchUrl, { json: body }).json()
  return data
}
