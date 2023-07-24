import { StyledComponent } from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Footer() {
    // const [author, setAuthor] = useState('');
    // const [quotes, setQuotes] = useState('');

    // useEffect(() => {
    //     getQuotes();
    // }, [])

    // function getQuotes() {
    //     axios.get("https://api.gameofthronesquotes.xyz/v1/random").
    //         then((res) => {
    //             const data = res.data;
    //             console.log(data.character.name);
    //             setAuthor(data.character.name);
    //             setQuotes(data.sentence);
    //         });
    // }

    let obj = {
        "Ino": "There is no meaning to a flower unless it blooms.",
        "Madara": "Wake up to reality! Nothing ever goes as planned in this Cursed World.",
        "Pain": "The world shall Know Pain!!!",
        "Jiraya": "A place where someone still thinks about you is a place you can call home.",
        "Naruto": "You donot die for your friends, you live for them.",
        "Orochimaru": "It is human nature not to realize the true value of something, unless they lose it.",
        "Itachi": "Even the strongest of opponents always has a weakness.",
        "Gaara": "Perhaps the companionship of an evil person is preferable to loneliness.",
        "Rock Lee": "A hero is not the one who never falls. He is the one that who gets up, again and again, never losing sight of his dreams.",
        "Ranchoo" : "Tum Gujarati log itne cute hote ho ... par tum log ka khana itna khatarnak kyun hota hai ... dhokla, fafda, handva, thepla ... aaise lagta hai jaise koi missiles hai",
        "Bunny" : "Shaadi is dal chawal for pachaas saal till you die ... arre life mein thoda bahut keema pav, tangdi kabab, hakka noodle bhi hona chahiye na",
        "Chasshmish": "Yaadein mithai ki dibbe ki tarah hoti hain...Ek baar khula to sirf ek tukda nai khaa paoge."
    }

    const keys = Object.keys(obj);
    const randomAuthor = keys[Math.floor(Math.random() * keys.length)];
    const randomQuote = obj[randomAuthor];

    return (
        <div className="d-flex flex-column" style={{ minHeight: "30vh", opacity:"0.8" }}>
            <footer className="mt-auto fixed-bottom">
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p style={{marginBottom:'5px', fontFamily:"Sedgwick Ave Display"}}>{randomQuote}</p>
                            <div className='a' style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{flex:"1", fontFamily:"Yesteryear"}} className=" mb-0">{randomAuthor}</div>
                                <div style={{flex:'0'}} className=" mb-0">
                                <a href='#' >GoTop</a>
                                </div>

                            </div>


                        </blockquote>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;