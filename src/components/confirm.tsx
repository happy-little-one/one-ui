import React, { FunctionComponent } from 'react'
import { Popconfirm } from 'antd'
import { PopconfirmProps } from 'antd/es/popconfirm'

interface Props extends Partial<PopconfirmProps> {
  action?: string
}

const Confirm: FunctionComponent<Props> = ({
  action = '删除',
  title,
  placement = 'topRight',
  onConfirm,
  children,
}) => {
  return (
    <Popconfirm title={title || `确定要${action}吗？`} placement={placement} onConfirm={onConfirm}>
      <a>{children}</a>
    </Popconfirm>
  )
}

export default Confirm
