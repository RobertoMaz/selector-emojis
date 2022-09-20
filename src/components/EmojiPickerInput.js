import React from "react";
import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import styles from "./emojiPicker.module.scss";

function EmojiPickerInput() {

    const refInput = useRef(null);

    return ( 
        <div className={styles.inputContainer}>
            <input ref={refInput}/>
            <EmojiPicker  ref={refInput}/>
        </div>
    );
}

export default EmojiPickerInput;