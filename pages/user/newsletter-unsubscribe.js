import React, { useState } from "react";
import { Button } from 'antd';

const unsubscribeNewsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {

    }
    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '80vh' }}>
                <div className="col-12" style={{ fontFamily: 'serif' }}>
                    <br />
                    <h1 className="text-center" style={{ fontWeight: 'bold' }} >Subribe for newsletter</h1>
                    <p className="text-center" style={{ fontSize: '18px'}}>Get news about new coursereleases and more!</p>
                    <form handleSubmit={handleSubmit} className="col-8 offset-2" >
                        <input className="form-control" />
                        <Button href="/user/newsletter-unsubscribe" handleSubmit={handleSubmit}></Button>
                    </form>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

export default unsubscribeNewsletter;