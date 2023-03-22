import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";
import { Anek_Latin } from "next/font/google";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        await serverAuth(req);
        const movies = await prismadb.movie.findMany()

        return res.status(200).json(movies);
    
 } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
 }   
}