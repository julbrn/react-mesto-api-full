import React from 'react';

function ImagePopup({card}) {
    return (
<>
                    <img src={card && card.link} className="popup__image" alt={card && card.name}/>
                    <h3 className="popup__caption">{card && card.name}</h3>
</>
    );
}

export default ImagePopup;