import type {FC} from 'react'
import {useDrop} from 'react-dnd'
import {TodoStatusT} from '../../types'

interface DropContainerI {
    children: any
    allowedDropEffect: TodoStatusT
}

export const DropContainer: FC<DropContainerI> = ({children, allowedDropEffect, }: DropContainerI) => {
    const [{canDrop, isOver}, drop] = useDrop(
        () => ({
            accept: 'box',
            drop: () => ({
                allowedDropEffect,
            }),
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [],
    )

    const isActive = canDrop && isOver;

    function setColor(status: TodoStatusT): string {
        switch (status) {
            case 'Queue':
                return 'red'
            case 'Development':
                return 'yellow'
            case 'Done':
                return 'green'
            default:
                return 'transparent'
        }
    }

    return (
        <div
            ref={drop}
            style={{
                border: isActive ? '5px dashed black' : '5px solid black',
                height: '100%',
                backgroundColor: setColor(allowedDropEffect),
                overflowY: 'scroll',
            }}>
            {children}
        </div>
    )
}
