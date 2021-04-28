import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Input, Select } from '@formily/antd-components'
import { Table, PageHeader, Card, Button, Space } from 'antd'

import store, { Product } from '@/store/product'
import { ModalForm, Search, Confirm } from '@/components'

const List = observer(() => {
  useEffect(store.fetchList, [])

  const { loading, list, search, pagination } = store

  const save = (it?: Product) => {
    ModalForm({
      title: it ? '编辑商品' : '新增商品',
      defaultValue: it,
      components: { Input, Select, Text: Input.TextArea },
      schema: {
        name: {
          type: 'string',
          title: '商品名称',
          'x-component': 'Input',
        },
        type: {
          type: 'string',
          title: '商品类型',
          'x-component': 'Select',
          enum: Product.options.type,
          default: 1,
        },
        description: {
          type: 'string',
          title: '商品描述',
          'x-component': 'Text',
        },
      },
      onSubmit: store.save,
    })
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品图片',
      dataIndex: 'img',
      render: (val: string) => <img src={val} />,
    },
    {
      title: '商品类型',
      dataIndex: 'typeName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
    },
    {
      title: '商品描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (it: Product) => (
        <Space>
          <Link to={`/products/detail/${it.id}`}>详情</Link>
          <a onClick={() => save(it)}>编辑</a>
          {it.canDelete && <Confirm onConfirm={() => store.del(it.id)}>删除</Confirm>}
        </Space>
      ),
    },
  ]

  const extra = (
    <Button type="primary" onClick={() => save()}>
      新增商品
    </Button>
  )

  return (
    <div>
      <PageHeader title="商品管理" extra={extra} />
      <div style={{ padding: 24, paddingTop: 0 }}>
        <Card>
          <Search
            components={{ Input, Select }}
            schema={{
              name: {
                title: '商品名称',
                'x-component': 'Input',
              },
              status: {
                title: '商品状态',
                'x-component': 'Select',
                enum: Product.options.status,
              },
              type: {
                title: '商品类型',
                'x-component': 'Select',
                enum: Product.options.type,
              },
            }}
            onSubmit={search}
          />
          <Table
            rowKey="id"
            loading={loading}
            dataSource={list}
            columns={columns}
            pagination={pagination}
          />
        </Card>
      </div>
    </div>
  )
})

export default List
