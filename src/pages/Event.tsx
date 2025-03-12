import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Loader from '../Components/Loader'
import Chat from '../Components/Chat'

const Event = () => {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventsCollection = collection(db, 'EventsInfo')
        const querySnapshot = await getDocs(eventsCollection)
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        const eventIndex = parseInt(id) - 1
        if (eventIndex >= 0 && eventIndex < eventsData.length) {
          setItem(eventsData[eventIndex])
        } else {
          console.error('Event ID is out of range')
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen bg-black flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center bg-black">
        <div className="relative flex justify-end">
          <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>
          <img
            src={item.Image}
            alt="Error"
            className="h-screen aspect-2/3 object-cover"
          />
        </div>
        <div className="max-h-screen flex flex-col gap-6 w-1/2 justify-center">
          <div className="text-[#FF9011] text-4xl font-semibold uppercase 2xl:text-6xl">
            {item.EventName}
          </div>
          <div className="text-gray-200 max-w-lg leading-relaxed 2xl:text-lg">
            {item.Description}
          </div>
          <div className="text-gray-200 flex flex-col gap-y-2">
            <p className="2xl:text-2xl">
              Artist : <span className="text-[#00FF6A]">{item.Artist}</span>
            </p>
            <p className="2xl:text-2xl">
              Venue : <span className="text-[#00FF6A]">{item.Venue}</span>
            </p>
            <p className="2xl:text-2xl">
              Date : <span className="text-[#00FF6A]">{item.Date}</span>
            </p>
            <p className="2xl:text-2xl">
              Price : <span className="text-[#00FF6A]">{item.Price}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-[#FF9011] w-40 h-10 rounded-md text-black font-semibold 2xl:text-xl hover:scale-105 transition-all">
              <Link to={`/Billing/${item.id}`}>BOOK NOW!!</Link>
            </button>
            <button className="bg-[#FF9011] w-40 h-10 rounded-md text-black font-semibold 2xl:text-xl">
              <Link to={`/events`}>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-3 right-6">
        <Chat />
      </div>
    </div>
  )
}

export default Event
