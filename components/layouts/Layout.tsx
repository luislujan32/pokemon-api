import { FC, ReactNode } from "react"
import Head from "next/head"
import { Navbar } from "../ui"

interface BaseLayoutProps {
  children?: ReactNode,
  title?: string
}

export const Layout: FC<BaseLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title> {title || 'Pokemon APP'} </title>
        <meta name="author" content="Luis Lujan" />
        <meta name="description" content={`Informacion sobre el Pokemon ${title} `} />
        <meta name="keywords" content={` ${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
