import React from 'react';

export default class AddSprout extends React.Component {
    render () {
        return (
            <>
            <header> Sprout </header>
            <h1> Add Sprout</h1>
            <form>
<input type="text" placeholder="Name" />
<input type="text" placeholder="Age" />
<input type="button" value="Upload Profile Image" />
<input type="submit" />
            </form>
            </>
        )
    }
}