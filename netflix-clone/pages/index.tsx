import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { getSession, signOut } from 'next-auth/react'
import { NextPageContext } from 'next'
import Navbar from '@/components/Navbar'
import Bilboard from '@/components/Bilboard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import InfoModal from '@/components/InfoModal'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }

}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: movies = [] } = useMovieList()
  const { data: favoriets = [] } = useFavorites()
  const {isOpen, closeModal} = useInfoModalStore();
 
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Bilboard />
      <div className='pb-40'>
        <MovieList title="Treding Now" data={movies}/>
        <MovieList title="My List" data={favoriets}/>
        </div>
  </>
  
      )
}
