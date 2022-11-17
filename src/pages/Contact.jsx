import React from 'react';

function Contact({address}) {
    return (
        <main className="container">
            <section className="row justify-content-center">
                <h3>Contacts</h3>
                <p>{address.name}</p>
                <p>{address.street}</p>
                <p>{address.town}</p>
                <p>{address.country}</p>
            </section>
        </main>
    );
}

export default Contact;
