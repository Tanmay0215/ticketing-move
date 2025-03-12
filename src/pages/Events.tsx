import MainSlider from '../components/MainSlider'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import UpcomingSlider from '../components/UpcomingSlider'
import Loader from '../components/Loader'
import Chat from '../components/Chat'
const Events = () => {
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(true)
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
        console.log(eventsData)
        setdata(eventsData)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="bg-black w-screen relative h-screen overflow-x-hidden">
        <MainSlider data={data} />
        <div className="mt-12">
          <div className="text-white text-2xl mx-10">Upcoming Events</div>
        </div>
        <div className="mt-10 mb-10">
          <UpcomingSlider data={data} />
        </div>
        <div className="fixed bottom-3 right-6">
          <Chat />
        </div>
      </div>
    )
  }
}

export default Events
