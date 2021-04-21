import React, { FunctionComponent, useState } from 'react'
import { Modal } from 'antd'
import { render, unmountComponentAtNode } from 'react-dom'
import { SchemaForm, createFormActions, ISchema, IAntdSchemaFormProps } from '@formily/antd'

interface Config extends IAntdSchemaFormProps {
  title: string // 标题
  width?: number // 宽度 默认 600
  labelCol?: number // 默认 4
  schema: {
    [key: string]: ISchema
  }
  // 需返回一个Promise, 供内部处理关闭和loading
  onSubmit: (values: object) => Promise<any>
}

export default (config: Config) => {
  const actions = createFormActions()

  const container = document.createElement('div')
  document.body.appendChild(container)

  const Content: FunctionComponent<Config> = props => {
    const { schema, onSubmit, title, width = 600, labelCol = 4, ...rest } = props
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)

    const closeModal = () => {
      setVisible(false)

      const timer = setTimeout(() => {
        unmountComponentAtNode(container)
        document.body.removeChild(container)
        clearTimeout(timer)
      }, 300)
    }

    const handleOk = () => {
      setLoading(true)
      actions
        .submit()
        .then(({ values }) => onSubmit(values))
        .then(() => {
          setLoading(false)
          closeModal()
        })
        .catch(err => {
          setLoading(false)
          throw err
        })
    }

    return (
      <Modal
        visible={visible}
        title={title}
        width={width}
        confirmLoading={loading}
        onCancel={closeModal}
        onOk={handleOk}
      >
        <SchemaForm
          {...rest}
          labelCol={labelCol}
          wrapperCol={24 - labelCol}
          actions={actions}
          schema={{
            type: 'object',
            properties: schema,
          }}
        />
      </Modal>
    )
  }

  render(<Content {...config} />, container)
}
