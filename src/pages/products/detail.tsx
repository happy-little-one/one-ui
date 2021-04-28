import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { PageHeader, Card, Descriptions } from 'antd'

import store from '@/store/product'

type Props = RouteComponentProps<{ id: string }>

const { Item } = Descriptions

const Detail = observer(({ match, history }: Props) => {
  const { id } = match.params
  const { item } = store

  useEffect(() => {
    store.fetchDetail(id)
  }, [])

  if (!item) return null

  const { name, statusName, typeName } = item

  return (
    <div>
      <PageHeader title="商品详情" onBack={() => history.goBack()} />
      <div style={{ padding: 24, paddingTop: 0 }}>
        <Card>
          <Descriptions>
            <Item label="商品名称">{name}</Item>
            <Item label="商品类型">{typeName}</Item>
            <Item label="商品状态">{statusName}</Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  )
})

export default Detail
