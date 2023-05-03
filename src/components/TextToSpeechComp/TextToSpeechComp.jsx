import React from 'react'
import { useSpeechSynthesis } from "react-speech-kit";

function TextToSpeechComp({text}) {
    const { speak } = useSpeechSynthesis();

    return (
        
        <div>
            <button className='' onClick={() => speak({ text:text})}>Speak</button>
        </div>
    )
}

export default TextToSpeechComp;