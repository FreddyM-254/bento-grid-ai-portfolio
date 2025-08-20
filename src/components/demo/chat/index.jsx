import { useState } from 'react'
import { api } from "../../../../convex/_generated/api"
import { useMutation } from 'convex/react'
import { create } from 'motion/react-m'

function ChatSection() {
    const createThread = useMutation(api.demo.chat.createThread)
    const [threadId, setThreadId] = useState(null)
  return (
    <div>
        <div>
            <h1>Convex Agent Demo Chat</h1>
        </div>
        {
            threadId ? (
                <div>Thread open</div>
            ): (
             <div>
                <p>No thread created yet</p>
                 <button
                     onCkick ={() => createThread().then(setThreadId)}
                 >
                    Create Thread
                    </button>
            </div>
            )
    }
    </div>
  )
}

export default ChatSection