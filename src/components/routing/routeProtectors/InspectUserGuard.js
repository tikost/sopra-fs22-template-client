import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Game from "../../views/Game";
import InspectUser from "../../views/InspectUser";

/**
 *
 * Another way to export directly your functional component.
 */
export const InspectUserGuard = props => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Route exact path={`${props.base}/${this.props.user.id}`}>
                <InspectUser/>
            </Route>
            <Route exact path={`${props.base}`}>
                <Redirect to={`${props.base}/${this.props.user.id}`}/>
            </Route>
        </div>
    );
};

InspectUserGuard.propTypes = {
    children: PropTypes.node
}