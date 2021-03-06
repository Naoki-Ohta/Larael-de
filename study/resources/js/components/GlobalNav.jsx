import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function GlobalNav () {

    const history = useHistory();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("ログアウトしました", res.data.message, "success");
                history.push('/');
                location.reload();
            } 
        });
    }

    var AuthButtons = '';

    if (!localStorage.getItem('auth_token')){
        AuthButtons = (
            <div>
                <li>
                    <Link to="/register">
                        <span>新規登録</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <span>ログイン</span>
                    </Link>
                </li>
            </div>
        );
    } else {
        AuthButtons = (
            <div>
                <li>
                    <div onClick={logoutSubmit}>
                        <span className="text-white">ログアウト</span>
                    </div>
                </li>
            </div>
        );
    }

    return(
        <ul>
            <li>
                <Link to="/">
                    <span>Top</span>
                </Link>
            </li>
            <li>
                <Link to="/about">
                    <span>About</span>
                </Link>
            </li>
            <li>
                <Link to="/login">
                    <span>logout</span>
                </Link>
            </li>
            {AuthButtons}
        </ul>
    )
}

export default GlobalNav;