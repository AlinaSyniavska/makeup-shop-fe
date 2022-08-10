import {FC} from "react";
import {Outlet} from "react-router-dom";

import {Pagination, Users} from "../../components";

const UsersPage: FC = () => {
    return (
        <div>
            <Pagination/>
            <Outlet/>
            <hr/>
            <Users/>
        </div>
    );
};

export {UsersPage};