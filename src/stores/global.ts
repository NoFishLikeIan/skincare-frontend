import { types as t } from 'mobx-state-tree'
import { UIStore } from '../stores/uiStore'
import { DataStore } from './dataStore'

export const GlobalStore = t.model('globalStore', {
  uiStore: UIStore,
  dataStore: DataStore,
})

export type IGlobalStatable = typeof GlobalStore.Type
