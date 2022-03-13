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


const ChangeUserDetails = props => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [birthday, setBirthday] = useState(null);
    let {userId} = useParams(); // get current parameters of clicked user

    const confirm = async () => {
        let item = {username, birthday}
        console.warn("item", item)
            try {
                const requestBody = JSON.stringify({username, birthday});
                const response = await api.put('/users/' + userId, requestBody);

                // Get the returned user and update a new object.
                const user = new User(response.data);
                history.push(`/users/${userId}`);


            } catch (error) {
                alert(`Something went wrong during the change attempt: \n${handleError(error)}`);
            }
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
                    placeholder={"enter a new username"}
                    onChange={un => setUsername(un)}
                />

                <FormField
                    label="birthday as yyyy-mm-dd (optional)"
                    value={birthday}
                    type={"date"}
                    placeholder={"dd-mm-yyyy"}
                    onChange={b => setBirthday(b)}
                />

                <p> Please confirm your changes.</p>

                <Button
                    width="100%"
                    onClick={() => confirm()}
                >
                    Confirm changes
                </Button>
                &nbsp;
                <Button
                    width="100%"
                    onClick={() => history.push(`/users/${user.map(itm => itm.id)}`)}
                >
                    Cancel
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer className="inspectUser container">
            <h2>Happy Coding!</h2>
            <p className="inspectUser paragraph">
                You may change your username and
                <p>input a birthday.</p>
            </p>
            <p className="inspectUser paragraph">
                Please then confirm your changes.
            </p>
            {content}
        </BaseContainer>
    );
}

export default ChangeUserDetails;
