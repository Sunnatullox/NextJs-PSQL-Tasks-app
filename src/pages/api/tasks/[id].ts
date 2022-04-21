/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { conn } from 'src/utils/database'

export default async(req:NextApiRequest, res:NextApiResponse)=>{

    const{method, query, body} = req

    switch(method){
        case 'GET':
            try {
                const text = 'SELECT * FROM tasks WHERE id = $1'
                const value = [query.id]
                const result = await conn.query(text, value)
                if(!result.rows.length) 
                return res.status(404).json('Task not found')

                return res.json(result.rows[0]);
            }catch (error: any){
                return res.status(500).json({messeg: error.messege}) 
            }
        case 'PUT':
            try {
                const {title, description}= body
                const text = 'UPDATE tasks SET title = $1, description= $2 WHERE id = $3 RETURNING *'
                const value = [title, description, query.id]
                const result = await conn.query(text, value)
                if(!result.rows.length) 
                return res.status(404).json('Task not found')

                return res.json(result.rows[0]);
            }catch (error: any){
                return res.status(500).json({messeg: error.messege}) 
            }
        case 'DELETE':
            try {
                const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
                const value = [query.id]
                const result = await conn.query(text, value)

                if(result.rowsCount === 0) 
                return res.status(404).json('Task not found')

                return res.json(result.rows[0]);
            }catch (error: any){
                return res.status(500).json({messeg: error.messege}) 
            }
            default:
                return res.status(400).json('method not allowed')
    }
}