import React from 'react'
import { observer } from 'mobx-react-lite'
import { Input, NumberPicker } from '@formily/antd-components'
import { Table, PageHeader, Card, Button } from 'antd'

import productStore, { Product } from '@/store/products'
import { ModalForm, Search } from '@/components'

const List = observer(() => {
  const { loading, list } = productStore

  const save = () => {
    ModalForm({
      title: '新增商品',
      components: { Input },
      schema: {
        name: {
          type: 'string',
          title: '商品名称',
          'x-component': 'Input',
        },
      },
      onSubmit: () => Promise.resolve(),
    })
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
    },
  ]

  const extra = (
    <Button type="primary" onClick={save}>
      新增商品
    </Button>
  )

  return (
    <div>
      <PageHeader title="商品管理" extra={extra} />
      <div style={{ padding: '0 24px' }}>
        <Card>
          <Search
            components={{ Input, NumberPicker }}
            schema={{
              name: {
                type: 'string',
                title: '商品名称',

                'x-component': 'NumberPicker',
              },
              name1: {
                type: 'string',
                title: '商品',

                'x-component': 'Input',
              },
              name2: {
                type: 'string',
                title: '商品名称',

                'x-component': 'Input',
              },
              name3: {
                type: 'string',
                title: '商品名称',

                'x-component': 'Input',
              },
              // name4: {
              //   type: 'string',
              //   title: '商品名称',
              //   'x-decorator': 'FormItem',
              //   'x-component': 'Input',
              // },
            }}
            onSubmit={console.log}
          />
          <Table rowKey="id" loading={loading} dataSource={list} columns={columns} />
        </Card>
      </div>
    </div>
  )
})

export default List
