import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    
    }
    try {
        await serverAuth(req);
        const { movieId } = req.query;

        if (typeof movieId !== 'string') {
            throw new Error('Invalid Id');
        }
        if (!movieId) {
            throw new Error('Missing Id');
        }
        const movie = await prismadb.movie.findUnique({
            where: { id: movieId },
            
        })
        return res.status(200).json(movie);
        
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

