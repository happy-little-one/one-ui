import { observable, action, computed } from 'mobx'
import { PaginationProps } from 'antd/es/pagination'

import { ResponseList } from '@/utils/http'

export default class Store<T> {
  service: {
    fetchList: (params: object) => Promise<ResponseList<T>>
    save: (data: any) => Promise<any>
    del: (data: any) => Promise<any>
    fetchDetail: (params: any) => Promise<T>
  }

  @observable loading = false
  @observable list: T[] = []
  @observable queries = {}
  @observable pagination: PaginationProps = {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: false,
    onChange: current => {
      this.pagination.current = current
      this.fetchList()
    },
  }
  @observable item: T

  @computed get params() {
    const { current: pageIndex, pageSize } = this.pagination
    return { ...this.queries, pageIndex, pageSize }
  }

  @action.bound
  fetchList() {
    this.loading = true
    this.service
      .fetchList(this.params)
      .then(({ list, total }) => {
        this.list = list
        this.pagination.total = total
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action.bound
  search(queries: object) {
    this.queries = queries
    this.fetchList()
  }

  @action.bound
  async save(data: object) {
    await this.service.save(data)
    return this.pageToOne()
  }

  @action.bound
  async del(data: any) {
    await this.service.del(data)
    this.fetchList()
  }

  @action.bound
  fetchDetail(params: any) {
    this.service.fetchDetail(params).then(item => (this.item = item))
  }

  @action.bound
  pageToOne() {
    this.queries = {}
    this.pagination.current = 1
    this.fetchList()
  }
}
