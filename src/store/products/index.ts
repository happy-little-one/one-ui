import { observable } from 'mobx'

import Product from './product'

class ProductStore {
  @observable loading = false
  @observable list: Product[] = []
  @observable params = {}
  @observable pigination = {}

  constructor() {
    this.find()
  }

  async find() {
    this.loading = true
    this.list = await [...Array(10)]
      .map((_, index) => ({
        id: index,
        name: '商品名称',
        status: 2,
      }))
      .map(it => new Product(it as Product))
    this.loading = false
  }
}

export { Product }
export default new ProductStore()
