import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import forwardRef from "./EmojiPicker";

function EmojiPickerInput() {

    const refInput = useRef(null);




    return ( 
        <div>
            <input ref={refInput}/>
            <forwardRef  ref={refInput}/>
        </div>
    );
}

export default EmojiPickerInput;