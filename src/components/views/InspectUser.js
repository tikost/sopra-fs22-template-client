import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/InspectUser.scss";
import User from "../../models/User";



const Player = ({user}) => (
    <div className="player container">
        <div className="player id">id: {user.id}</div>
        <div className="player username">{user.username}</div>
        <div className="creation date">{user.creationDate}</div>
        <div className="status">{user.status}</div>
        <div className="birthday">{user.birthday}</div>
    </div>
);

const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

Player.propTypes = {
    user: PropTypes.object
};


const InspectUser = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    let {userId} = useParams(); // get current parameters of clicked user

    const confirm = () => {
        history.push('/game');
    }

    {/*
    const edit = () => {
        // localStorage.setItem(x); // save changed items
        history.push('/game');
    }
    */}

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+userId);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
            <div className="user overview">

                <FormField
                    label="username"
                    value={user.username}
                    />

                <FormField
                    label="id"
                    value={user.id}
                />

                <FormField
                    label="creation date"
                    value={user.creationDate}
                />

                <FormField
                    label="status"
                    value={user.status}
                />

                <FormField
                    label="birthday"
                    value={user.birthday}
                />


                {/*
                <ul className="player id">
                    {user.map(user => (
                        <Player user={user.username} key={user.username}/>
                    ))}
                </ul>
                <ul className="user details">
                    {user.map(user => (
                        <Player user={user.creationDate}/>
                    ))}
                </ul>
                <ul className="user details">
                    {user.map(user => (
                        <Player user={user.status}/>
                    ))}
                </ul>
                <ul className="user details">
                    {user.map(user => (
                        <Player user={user}/>
                    ))}
                </ul>
                */}

                <Button
                    width="100%"
                    onClick={() => confirm()}
                >
                    Confirm
                </Button>
                {/*
                <Button
                    width="100%"
                    onClick={() => edit()}
                >
                    Edit
                </Button>
                */}
            </div>
        );
    }

    return (
        <BaseContainer className="user-container">
            <h2>Happy Coding!</h2>
            <p className="game paragraph">
                User data overview:
            </p>
            {content}
        </BaseContainer>
    );
}

export default InspectUser;
