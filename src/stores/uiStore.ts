import { types as t } from 'mobx-state-tree'
import { debounce } from 'lodash'

export const UIStore = t
  .model('uiStore', {
    widthPage: window.innerWidth,
    heightPage: window.innerHeight,
    from: t.number,
    to: t.maybeNull(t.number),
  })
  .actions(self => ({
    computeSize() {
      self.widthPage = window.innerWidth
      self.heightPage = window.innerHeight
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.computeSize()
      window.addEventListener('resize', debounce(self.computeSize, 50))
    },
  }))
  .views(self => ({
    get timeBoundaries() {
      const { from, to } = self
      return { from, to }
    },
  }))

export type UIStoreType = typeof UIStore.Type
