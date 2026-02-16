import { useState, useRef } from "react"

export default function TestMic() {
    const [recording, setRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    const handleClick = async () => {
        if (!recording) {
            // Start recording
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)

            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.start()
            console.log("Recording started 🎙")

            setRecording(true)
        } else {
            // Stop recording
            mediaRecorderRef.current?.stop()
            console.log("Recording stopped ⛔")

            setRecording(false)
        }
    }

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Mic Test</h1>

            <button onClick={handleClick}>
                {recording ? "Stop Recording" : "Start Recording"}
            </button>
        </div>
    )
}
