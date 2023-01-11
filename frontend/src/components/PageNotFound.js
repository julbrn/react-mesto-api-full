import React from 'react';
import { Link } from 'react-router-dom';

import notFoundGif from '../images/Travolta.gif';

function PageNotFound () {
    return (
        <div className="not-found">
            <h3 className="not-found__title">
                Страница не найдена
            </h3>
            <img className="not-found__image" src={notFoundGif} alt="Растерянный Траволта разводит руками"/>
            <p className="not-found__text">
                Упс, здесь совсем ничего нет...
            </p>
            <Link className="not-found__button" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound;