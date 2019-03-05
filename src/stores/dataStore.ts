import { types as t, flow, getRoot } from 'mobx-state-tree'
import { getDataFilter } from '../lib/fetchingUtils'
import { IGlobalStatable } from '../stores/global'

const InstanceResponse = t.model('instanceResponse', {
  _id: t.string,
  mood: t.number,
  skin: t.number,
  products: t.array(t.string),
  food: t.array(t.string),
  exercise: t.boolean,
  period: t.boolean,
  time: t.number,
})

export const DataStore = t
  .model('dataStore', {
    fetchedData: t.array(InstanceResponse),
    fetchStatus: t.enumeration('fetchStatus', ['done', 'error', 'pending']),
  })
  .views(self => ({
    get global() {
      const global: IGlobalStatable = getRoot(self)
      return global
    },
  }))
  .actions(self => {
    function* fetchDataset(): IterableIterator<any> {
      const { from, to } = self.global.uiStore.timeBoundaries
      self.fetchStatus = 'pending'
      try {
        self.fetchedData = yield getDataFilter(from, to)
        self.fetchStatus = 'done'
      } catch (error) {
        console.error('Failed to fetch projects', error)
        self.fetchStatus = 'error'
      }
    }

    return { fetchData: flow(fetchDataset) }
  })

export type InstanceResponseType = typeof InstanceResponse.Type
export type DataStoreType = typeof DataStore.Type
