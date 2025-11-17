// app/layout.tsx (Next.js 13+)
import { prisma } from 'prisma.ts'
import './globals.css'

export const metadata = {
  title: 'Astro AI',
  description: 'Ramalan harian berbasis AI',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await prisma.user.findMany() // contoh query

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Data Pengguna:</h1>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
          {children}
        </main>
      </body>
    </html>
  )
}
