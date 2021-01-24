import React from "react";
import {
    Link
} from "react-router-dom";

export default function Debug() {
    return (
        <div>
            <Link to="/app/queue">Queue</Link>
            <Link to="/app/dashboard">Dashboard</Link>
            <Link to="/app/typography">Typography</Link>
            <Link to="/app/tables">Tables</Link>
            <Link to="/app/notifications">Notifications</Link>
            <Link exact to="/app/ui">UI</Link>
            <Link to="/app/ui/maps">Maps</Link>
            <Link to="/app/ui/icons">Icons</Link>
            <Link to="/app/ui/charts">Charts</Link>
        </div>
    );
}
