import { OptionsToJson } from '@/utils'

// 领域实体
export default class Product {
  id: number
  img: string
  name: string
  type: 1 | 2
  status: 1 | 2
  description: string

  // config 类数据用 static 承载
  static options = {
    status: [
      { label: '上架', value: 1 },
      { label: '下架', value: 2 },
    ],
    type: [
      { label: '虚拟商品', value: 2 },
      { label: '实体商品', value: 1 },
    ],
  }

  constructor(params: Product) {
    Object.keys(params).forEach(key => (this[key] = params[key]))
  }

  // 计算属性，ui内不要有转换逻辑
  get statusName() {
    return OptionsToJson(Product.options.status)[this.status]
  }

  get typeName() {
    return OptionsToJson(Product.options.type)[this.type]
  }

  // 计算属性，ui内不要有复杂判断逻辑
  get canDelete() {
    return this.status === 2 || this.type === 2
  }
}
