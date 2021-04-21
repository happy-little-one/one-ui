import React, { useState, useEffect } from 'react'
import {
  SchemaForm,
  Submit,
  Reset,
  createFormActions,
  IAntdSchemaFormProps,
  ISchema,
} from '@formily/antd'
import { FormMegaLayout } from '@formily/antd-components'
import { Space } from 'antd'

interface Props extends IAntdSchemaFormProps {
  labelWidth?: number
  responsive?: { s: number; m: number; lg: number }
  schema: {
    [key: string]: ISchema
  }
}

const acitons = createFormActions()

const Search = ({
  labelWidth = 72,
  responsive = { s: 2, m: 3, lg: 4 },
  components,
  defaultValue = {},
  schema,
  onSubmit,
  ...rest
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [toggleVisible, setToggleVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [paddingBottom, setPaddingBottom] = useState(0)

  const setWindowWidthFn = () => {
    setWindowWidth(window.innerWidth)
  }

  const changeLayout = () => {
    let breakpoint = 'lg'
    if (windowWidth < 1200 && windowWidth >= 700) breakpoint = 'm'
    if (windowWidth < 700) breakpoint = 's'

    const fieldKeys = Object.keys(schema)
    const fieldTotal = fieldKeys.length
    const fieldsPerRow = responsive[breakpoint]

    if (expanded) {
      acitons.setFieldState('*', state => (state.display = true))
      setPaddingBottom(fieldTotal % fieldsPerRow === 0 ? 24 : 0)
    } else {
      const startHideIndex = fieldsPerRow - 1
      const hideKeysString = fieldKeys.slice(startHideIndex).toString()
      const visibleKeysString = fieldKeys.slice(0, startHideIndex).toString()
      acitons.setFieldState(`*(${hideKeysString})`, state => (state.display = false))
      acitons.setFieldState(`*(${visibleKeysString})`, state => (state.display = true))

      setPaddingBottom(0)
    }

    setToggleVisible(fieldTotal >= fieldsPerRow)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowWidthFn)
    return () => window.removeEventListener('resize', setWindowWidthFn)
  }, [])

  useEffect(changeLayout, [windowWidth, expanded])

  return (
    <SchemaForm
      {...rest}
      style={{ position: 'relative', marginBottom: 24, paddingBottom }}
      actions={acitons}
      components={{ FormMegaLayout, ...components }}
      defaultValue={defaultValue}
      schema={{
        type: 'object',
        properties: {
          container: {
            type: 'object',
            'x-component': 'mega-layout',
            'x-component-props': {
              grid: true,
              full: true,
              autoRow: true,
              labelAlign: 'right',
              labelWidth,
              responsive,
            },
            properties: schema,
          },
        },
      }}
      onSubmit={values => onSubmit(values)}
      onReset={() => onSubmit(defaultValue)}
    >
      <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <Space>
          {toggleVisible && (
            <a onClick={() => setExpanded(!expanded)}>{expanded ? '收起' : '展开'}</a>
          )}
          <Reset>重置</Reset>
          <Submit>搜索</Submit>
        </Space>
      </div>
    </SchemaForm>
  )
}

export default Search
