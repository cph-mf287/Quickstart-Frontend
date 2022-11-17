import React, {useRef} from 'react';

function Search(props) {

    const inputRef = useRef();
    //console.log(inputRef.current)

    return (
        <main className="container">
            <section className="row justify-content-center">
                <h3>Search</h3>
                <form>
                    <input
                        ref={inputRef}
                        required
                        type="search"
                        placeholder="Search...."
                    />
                    <button
                        type="submit"
                        onClick={() => {
                            inputRef.current.focus()
                        }}
                    >Submit</button>
                </form>
            </section>
        </main>
    );
}

export default Search;
