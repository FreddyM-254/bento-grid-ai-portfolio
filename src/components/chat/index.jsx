import { Section } from "../shared/Section"
import "../../styles/chat/chat.css"
import { BrushCleaning } from "lucide-react"
import { api } from "../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useEffect, useState, useCallback, useRef } from "react"
import { useAnonUser} from "./AnonUserContext"


const CurrentThreadIdStoragekey = "sidbot_current_thread_id"

export default function Chat() { 
  const anonUser = useAnonUser()
  const hasInitialized = useRef(false)
  const [currentThreadId, setCurrentThreadId] = useState(
   () => localStorage[CurrentThreadIdStoragekey] || null
  )

  console.log('anon user', anonUser)

const createThread = useMutation(api.sidbot.mutation.createThreadForUser)

const handleCreateThread = useCallback(async ()=> {
  console.log('inside handle create thread')
  console.log('inside', anonUser, hasInitialized.current)
   if (!anonUser || hasInitialized.current) return

   hasInitialized.current = true
   try{
    const id = await createThread({ userId: anonUser._id });
    localStorage[CurrentThreadIdStoragekey] = id
    setCurrentThreadId(id)
   } catch (error) {
      console.error(error)
      hasInitialized.current = false
   }
}, [anonUser, createThread])
useEffect(() => {
  if (!anonUser) return

  if(!currentThreadId) {
    handleCreateThread()
  }
},[anonUser, currentThreadId, handleCreateThread])

  return (
   <div className="chat-container">
    <div className="chat-header">
      <div className="chat-header-avatar">
        <img
        src="/src/assets/avatars/me.jpg"
        alt="Assistant Avatar"
        />
      </div>
      <div className="chat-=header-content">
      <h2 className="chat-header-title"> Sid Bot</h2>
    </div>
    <button
    className="chat-header-new-thread-btn"
    title="Start new conversation"

    >
      <BrushCleaning size={16} />
    </button>
   </div>

   <div className="chat-message-container">

    {/* <MessagesList

    /> */}

   </div>
   </div>
  )
}