import React from 'react'
import { PageHeader } from '@ant-design/pro-components';

export default function NewHeader(props) {
    return (
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            subTitle={props.subtitle}
            title="Inventory"
        />
    )
}
