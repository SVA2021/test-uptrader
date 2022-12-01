import {ProjectI} from "../types"

export const ProjectsFake: ProjectI[] = [
    {
        id: '0',
        name: 'empty project',
        todos: [],
    },
    {
        id: '1',
        name: 'interesting project',
        todos: [
            {
                id: 0,
                title: 'first task',
                description: 'description of first task. i think it will not be too long',
                initialDate: '2022-11-27',
                expirationDate: '2022-11-30',
                priority: 'normal',
                files: ['filepath',],
                status: 'Development',
                subTask: [
                    {
                        id: 0,
                        isFinished: false,
                        description: 'subtask description 1',
                    },
                    {
                        id: 1,
                        isFinished: true,
                        description: 'subtask description 2',
                    },
                ],
                comments: [
                    {
                        id: 11,
                        name: 'comment 1',
                        subComments: [],
                    },
                ],

            },
            {
                id: 1,
                title: 'second task',
                description: 'description of first task. i think it will not be too long',
                initialDate: '2022-11-27',
                expirationDate: '2022-11-30',
                priority: 'high',
                files: ['filepath2',],
                status: 'Done',
                subTask: [
                    {
                        id: 0,
                        isFinished: false,
                        description: 'subtask description 1',
                    },
                    {
                        id: 1,
                        isFinished: true,
                        description: 'subtask description 2',
                    },
                ],
                comments: [
                    {
                        id: 11,
                        name: 'comment 1111',
                        subComments: [],
                    },
                ],

            },
            {
                id: 2,
                title: 'another task',
                description: 'description of first task. i think it will not be too long',
                initialDate: '2022-11-27',
                expirationDate: '2022-11-30',
                priority: 'low',
                files: ['filepath2',],
                status: 'Queue',
                subTask: [
                    {
                        id: 0,
                        isFinished: false,
                        description: 'subtask description 1',
                    },
                    {
                        id: 1,
                        isFinished: true,
                        description: 'subtask description 2',
                    },
                ],
                comments: [
                    {
                        id: 11,
                        name: 'comment 1111',
                        subComments: [],
                    },
                ],

            },
        ],
    },
    {
        id: '2',
        name: 'another empty project',
        todos: [],
    },

]