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
                        isFinished: false,
                        description: 'subtask description 1',
                    },
                    {
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

            }
        ],
    },
    {
        id: '2',
        name: 'another empty project',
        todos: [],
    },

]