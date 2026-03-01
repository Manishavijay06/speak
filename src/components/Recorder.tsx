import { useState, useRef } from "react"

interface RecorderProps {
    onRecordingComplete: (audioBlob: Blob) => void
}

export default function Recorder({ onRecordingComplete }: RecorderProps) {
    const [recording, setRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)

        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data)
            }
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
                type: "audio/webm",
            })

            onRecordingComplete(audioBlob)
        }

        mediaRecorder.start()
        setRecording(true)
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop()
        setRecording(false)
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h3>{recording ? "🎙 Recording..." : "Ready"}</h3>

            {!recording ? (
                <button onClick={startRecording}>Start</button>
            ) : (
                <button onClick={stopRecording}>Stop</button>
            )}
        </div>
    )
}
