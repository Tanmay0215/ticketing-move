import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import RewardCoins from './RewardCoins'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [rewardToken, setRewardToken] = useState(0)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true)
        const userDocRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          const rewardTokens = userDoc.data().rewardTokens || 0
          setRewardToken(rewardTokens)
        } else {
          console.log('No user document found!')
        }
      } else {
        setIsLoggedIn(false)
      }
    })
    return () => unsubscribe()
  }, [rewardToken])

  return (
    <div className="absolute flex w-full justify-between items-center text-white px-5 md:px-10 py-5">
      <div className="uppercase font-jaini text-4xl 2xl:text-5xl">
        <Link to='/'>Ticketing</Link>
      </div>
      {!isLoggedIn ? (
        <div className='flex gap-5 px-6 py-2 rounded-full border-2 border-gray-600'>
          <Link to='/login'>Join Here!</Link>
        </div>
      ) : (
        <RewardCoins coins={rewardToken} />
      )}
    </div>
  )
}

export default NavBar
