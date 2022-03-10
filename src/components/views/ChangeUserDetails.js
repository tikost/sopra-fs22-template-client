import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/InspectUser.scss";



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
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

Player.propTypes = {
    user: PropTypes.object
};


const ChangeUserDetails = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [birthday, setBirthday] = useState(null);
    let {userId} = useParams(); // get current parameters of clicked user

    const confirm = (props) => {
        localStorage.setItem(props.username); // save changed items
        localStorage.setItem(props.birthday)
        history.push(`/game`);
    }

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
                    value={username}
                    onChange={un => setUsername(un)}
                />

                <FormField
                    label="birthday (optional)"
                    value={birthday}
                    onChange={b => setBirthday(b)}
                />

                <p> Please then confirm your changes.</p>

                <Button
                    width="100%"
                    onClick={() => history.push(`/game`)}
                >
                    Confirm changes
                </Button>
                &nbsp;
                <Button
                    width="100%"
                    onClick={() => history.push(`/users/${user.map(itm => itm.id)}`)}
                >
                    Back to user data overview
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer className="user-container">
            <h2>Happy Coding!</h2>
            <p className="game paragraph">
                You may change your username and input a birthday.
                Please then confirm your changes.
            </p>
            {content}
        </BaseContainer>
    );
}

export default ChangeUserDetails;
