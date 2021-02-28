import { GetServerSideProps } from 'next';

import { Login } from './Login';
import { LoginProvider } from '../contexts/LoginContext';

export default function Home() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

//   return {
//     props: {
//       level: Number(level),
//       currentExperience: Number(currentExperience),
//       challengesCompleted: Number(challengesCompleted)
//     }
//   }
// }

// Back-end (Ruby for ex.) 
// Next.js (Node.js)
// Client (React)
