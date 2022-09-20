import {forwardRef, useEffect, useRef, useState} from 'react';
import EmojiButton from './EmojiButton';
import {data as emojiList} from "./emojiPicker/data"
import EmojiSearch from './EmojiSearch';

import styles from "./emojiPicker.module.scss"


export function EmojiPicker(props, inputRef) {

    const [isOpne, setIsOpne] = useState(false);
    const [emojis, setEmojis] = useState(emojiList);

    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if(!containerRef.current.contains(e.target)){
                setIsOpne(false);
                setEmojis(emojiList);
            }
        })
    }, []);

    function handleClickOpen() {
        setIsOpne(!isOpne);
    }

    
    function handleSearch(e) {
        const query = e.toLowerCase();
        console.log(query);
        if(!!query){
            const search = emojiList.filter((emoji) => {
                return (emoji.name.includes(query)) || emoji.keywords.includes(query)});

            setEmojis(search);

        } else {
            setEmojis(emojiList);
        }
    }


    // function EmojiPickerContainer() {

    

    //     return <div>
    //         <EmojiSearch onSearch={handleSearch}/>
    //         <div>
    //             { 
    //                 emojiList.map((emoji, index) =>     
    //                     <div key={index}>
    //                         {emoji.Symbol}
    //                     </div>
    //                 )
    //             }
    //         </div>
    //     </div>
    // }


    function handleOnClickEmoji(emoji) {
        const cursorPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursorPos);
        const next = text.slice(cursorPos);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
        inputRef.current.focus();
    }

    return (
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}>
                😀
            </button>
            {isOpne ?
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch}/>
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton  
                                key={emoji.symbol} 
                                emoji={emoji} 
                                onClick={handleOnClickEmoji}
                            />   
                            ))
                        }
                    </div>
                </div> :  "" 
            }
        </div>
    );
}


export default forwardRef(EmojiPicker);