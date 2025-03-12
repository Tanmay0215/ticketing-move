import NavBar from '../components/NavBar'
import ReactTypingEffect from 'react-typing-effect'
import Taylor from '../assets/Taylor.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-gray-900">
      <NavBar />
      <div className="min-h-screen text-white flex gap-5 justify-between items-center px-5 md:px-16">
        <div className="space-y-8 mt-12">
          <div className="text-5xl 2xl:text-6xl font-semibold max-w-md h-36">
            <ReactTypingEffect
              text={['Welcome to TICKETING!', 'Your gateway to infinite fun!']}
              speed={100}
              eraseSpeed={75}
              eraseDelay={1000}
            />
          </div>
          <p className="pt-10 text-md 2xl:text-xl max-w-lg leading-relaxed">
            Welcome to{' '}
            <span className="font-bold text-orange-400">TICKETING</span>, your
            ultimate destination for concert tickets! Explore an exciting lineup
            of upcoming music events, featuring top artists and unforgettable
            performances across genres..
          </p>
          <button>
            <Link
              to="/events"
              className="px-8 py-3 bg-gray-800 text-white text-xl 2xl:text-2xl rounded-2xl hover:scale-105 hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Browse Events
            </Link>
          </button>
        </div>

        <div className="hidden relative md:flex justify-center items-center">
          <div className="flex justify-center mt-20">
            <img className="w-[60%] 2xl:w-full" src={Taylor} alt="Error" />
            <img
              className="w-[60%] 2xl:w-full absolute right-40 bottom-10"
              src={Taylor}
              alt="Error"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
