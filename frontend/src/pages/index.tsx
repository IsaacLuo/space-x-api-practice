import Image from 'next/image'
import { Inter } from 'next/font/google'
import LaunchList from './components/launch-list'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-stretch p-24 ${inter.className}`}
    >
      <LaunchList/>
    </main>
  )
}
