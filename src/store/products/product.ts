export default class Product {
  // config 用 static 表达
  static statusOptions = [
    { label: '上架', value: 1 },
    { label: '下架', value: 2 },
  ]

  id: number
  name: string
  status: 1 | 2

  constructor(params: Product) {
    Object.keys(params).forEach(key => (this[key] = params[key]))
  }

  // 计算属性，ui内不要有转换逻辑
  get statusName() {
    return Product.statusOptions.find(it => it.value === this.status).label
  }

  get canDelete() {
    return this.status === 2
  }
}
