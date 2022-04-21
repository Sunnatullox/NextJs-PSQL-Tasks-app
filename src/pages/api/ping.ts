/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from 'src/utils/database'

type Data = {
    messege:string;
    time:string;
}


export default async (req: NextApiRequest, res: NextApiResponse <Data>) => {
  const response = await conn.query("SELECT NOW()");
  return res.json({ messege: "pong", time: response.rows[0].now });
};
