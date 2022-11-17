import {useEffect, useState} from "react"
import {handleHttpErrors} from "../utils/apiFacade.js";
import {CHUCK_NORRIS_JOKE_URL, DAD_JOKE_URL} from "../settings.js";

export const fetchJoke = async (url) => {
    let response = await fetch(url);
    try {
        return (await handleHttpErrors(response)).json();
    } catch (error) {
        error = await error;
        console.log(await error.message);
    }
};

export default () => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        (async () => {
            let dadJoke = await fetchJoke(DAD_JOKE_URL);
            let chuckNorrisJoke = await fetchJoke(CHUCK_NORRIS_JOKE_URL);
            setJokes([...jokes, dadJoke, chuckNorrisJoke]);
        })();
    }, []);

    useEffect(() => console.log(jokes), [jokes]);

    return (
        <main className="container">
            <section className="row">
                <h3>Jokes</h3>
                {jokes.length > 0 && jokes.map(joke =>
                    <div className="col-6" key={joke.url}>
                        <div className="card mb-2">
                            <div className="row">
                                <div className="col-4 text-center">
                                    {joke.type === "Dad Joke" ?
                                        <img className="my-4 ms-4 me-0" src={joke.icon} height="100px"/> :
                                        <img className="my-4 ms-3 me-0" src={joke.icon} height="100px"/>
                                    }
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <blockquote>{joke.value}</blockquote>
                                        <div className="row text-end">
                                            <a href={joke.url}>Permalink</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};
