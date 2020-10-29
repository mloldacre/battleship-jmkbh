import React, { Component } from 'react';
import './joinrandomgame.css'
import Context from '../../../Context'

//this component will look for and join a new game when the person is ready to play.
//i'm thinking if a new game isn't already created, this is the thing that will create a new instance of a game
class JoinRandomGame extends Component{
    static contextType = Context;

    // handleClick = () => {
    //     this.context.handleTheme('menu.mp3')
    // }

    render(){
        return(
            <button className="gameButton">Random Game</button>
        )
    }
}

export default JoinRandomGame