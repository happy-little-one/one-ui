import http, { ResponseList } from '@/utils/http'
import Store from '@/store/basic/store'

import Product from './product'

//领域store
class ProductStore extends Store<Product> {
  constructor() {
    super()
    //领域service, service 内均为纯函数
    this.service = {
      async fetchList(params) {
        const { list, total } = await http.get<ResponseList<Product>>('/products', params)
        return {
          list: list.map(it => new Product(it)),
          total,
        }
      },
      save: (data: object) => http.post('/products/save', data, { note: '保存成功' }),
      del: (id: number | string) => http.post('/products/del', { id }, { note: '删除成功' }),
      async fetchDetail(id: number | string) {
        const item = await http.get<Product>('/products/detail', { params: { id } })
        return new Product(item)
      },
    }
  }
}

export { Product }

export default new ProductStore()
