import MessageParser from './MessageParser.js'
import ActionProvider from './ActionProvider.js'
import 'react-chatbot-kit/build/main.css'
import Chatbot from 'react-chatbot-kit'
import config from './config.js'

const MyComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  )
}

export default MyComponent
