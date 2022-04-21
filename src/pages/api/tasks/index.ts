import { NextApiRequest, NextApiResponse } from "next";
/* import { conn } from "../../../utils/database"; */
import {conn} from 'src/utils/database'

/* eslint-disable import/no-anonymous-default-export */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
        try {
            const handelGet = 'SELECT * FROM tasks'
            const result = await conn.query(handelGet)
            return res.status(200).json(result.rows);
        } catch (error:any) {
            return res.status(400).json({error:error.messege})
            
        }
    case "POST":
        try {
            const { title, description } = body;
            const query =
              "INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *";
            const value = [title, description];
      
            const response = await conn.query(query, value);
      
            return res.status(200).json(response.rows[0]);
        } catch (error:any) {
            return res.status(400).json({error:error.messege})       
        }
    default:
      return res.status(400).json("invalid method");
  }
};
