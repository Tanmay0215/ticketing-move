import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Temp from './temp'
import sciCut from '../assets/Group 20.svg'
import { collection, getDocs } from 'firebase/firestore'
import Counter from '../components/Counter'
import { WalletButton } from '../components/WalletButton'

const BillingPage2 = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [item, setitem] = useState({})
  const [account, setAccount] = useState(null)
  const [user1, setUser1] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [rates, setRates] = useState({});
  // const [selectedCurrency, setSelectedCurrency] = useState('USD');
  // const [convertedValue, setConvertedValue] = useState(null);

  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('tickets')
    return savedTickets ? parseInt(savedTickets) : 1
  })

  useEffect(() => {
    setLoading(true)
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'EventsInfo')
        const querySnapshot = await getDocs(eventsCollection)
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setitem(eventsData[id - 1])
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      console.log(user.photoURL)
      setUser1(user)
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
    fetchEvents()
    return () => unsubscribe()
  }, [id])

  console.log(item)

  return (
    <div className="w-screen h-screen bg-[#1F1F1F] text-white relative">
      <img
        className="absolute w-full h-[55%] opacity-35 blur-xl aspect-2/3"
        src={item['Image']}
      />
      <img
        className="absolute w-[120px] h-[120px] rounded-full blur-sm translate-x-[-40%] bottom-[24%]"
        src={item['NFTimg']}
      />
      <img
        className="absolute w-[120px] h-[120px] rounded-full blur-sm translate-x-[-40%] bottom-[24%]"
        src={item['NFTimg']}
      />
      <div className="flex flex-col justify-center absolute z-[1] bg-none items-center w-full">
        <div className="w-11/12 flex items-center pt-3 justify-between">
          <span className="text-[45px] font-jaini">TICKETING</span>
          <div className="flex gap-x-2">
            <WalletButton />
            {user1 ? (
              <img
                src={user1.photoURL}
                className="w-[50px] h-[50px] rounded-full"
              />
            ) : (
              <div className="bg-purple-600 w-[50px] h-[50px] rounded-full"></div>
            )}
          </div>
        </div>

        <div className="justify-center font-ptMono w-full flex items-center">
          <div className="relative flex h-1/2 gap-x-20 w-10/12 bg-slate-600 bg-opacity-70 px-10 py-4 rounded-md m-5 z-10">
            <div className="w-4/6 text-white flex flex-col justify-evenly gap-x-10">
              <div className="text-2xl font-bold">{item.EventName}</div>
              <div className="text-justify font-semibold">
                {item.Description}
              </div>
              <div className="font-semibold text-[20px]">
                Artist : {item.Artist}
              </div>
              <div className="font-semibold text-[20px]">
                Price: {item.Price}
              </div>
            </div>
            <div className="w-2/6 h-full flex justify-center">
              <img src={item.Image} className="object-fill h-[24rem]" />
            </div>
            <div className="absolute font-stickNoBills font-semibold w-full text-center text-[66px] left-[50%] translate-x-[-50%] translate-y-[50%] bottom-[0px]">
              {item.EventName}
            </div>
          </div>
        </div>

        <div className="flex font-ptMono gap-x-[80px] h-full">
          <div className="flex px-2 flex-col justify-center items-center gap-y-3">
            <span className="text-[52px] font-portLigatSlab text-[#E9FF42]">
              Event Details
            </span>
            <div className="flex text-[27px] justify-center items-center flex-col">
              <span className="flex justify-center items-center gap-x-2">
                <span>Venue</span> <span className="text-yellow-400">:</span>{' '}
                <span className="font-rockSalt text-red-500">{item.Venue}</span>
              </span>

              <span className="flex justify-center items-center gap-x-2">
                <span>Date</span> <span className="text-yellow-400">:</span>{' '}
                <span className="font-rockSalt text-red-500">{item.Date}</span>
              </span>

              <span className="flex justify-center items-center gap-x-2">
                <span>Artist</span> <span className="text-yellow-400">:</span>{' '}
                <span className="font-rockSalt text-red-500">
                  {item.Artist}
                </span>
              </span>

              <span className="flex justify-center items-center gap-x-2">
                <span>Ticket Price</span>{' '}
                <span className="text-yellow-400">:</span>{' '}
                <span className="font-rockSalt text-red-500">
                  {item.Price} APT
                </span>
              </span>
            </div>
          </div>

          <div>
            <img src={sciCut} />
          </div>

          <div>
            <div className="flex font-ptMono px-2 flex-col justify-center items-center gap-y-3 h-full">
              <span className="text-[52px] font-portLigatSlab text-[#E9FF42]">
                Event Details
              </span>
              <div className="flex text-[27px] w-full justify-center gap-y-1 items-center flex-col">
                <Counter tickets={tickets} setTickets={setTickets} />

                <span className="flex justify-center items-center gap-x-2">
                  <span>Price</span> <span className="text-yellow-400">:</span>{' '}
                  <span className="text-red-500">{item.Price * tickets}</span>
                </span>

                {account ? (
                  <Temp
                    accountAddress={account}
                    userName={user1.displayName}
                    tickets={tickets}
                    event={item}
                  />
                ) : (
                  <Temp tickets={tickets} event={item} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingPage2
