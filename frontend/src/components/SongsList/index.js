import React from 'react'
import { Link } from 'react-router-dom'

export const SongsList = () => {
    return (
        <div>
            <ul id='songs-list'>
                <li>Song One
                    <Link to='edit/1'><button>Edit</button></Link>
                    <Link><button>Delete</button></Link>
                </li>
            </ul>
            <div></div>

        </div>
    )
}
