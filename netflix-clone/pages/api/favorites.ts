import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    
    }
    try {
        const { currentUser } = await serverAuth(req);
        const favoritedMovies = await prismadb.movie.findMany({
            where: {
              id: {
                in: currentUser?.favoriteIds,
              }
            }
          });
      
        return res.status(200).json(favoritedMovies);
        
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

