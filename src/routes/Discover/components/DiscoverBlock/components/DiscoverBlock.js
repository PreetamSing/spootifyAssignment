import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';

async function scrollContainer(id, { isNegative } = {}, loadFunc, setLoading) {
  setLoading(true);
  await loadFunc();
  setLoading(false);
  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id, data, imagesKey = 'images', loadFunc }) {
  const [loading, setLoading] = useState(false)

  const leftScroll = () => {
    scrollContainer(id, { isNegative: true }, loadFunc, setLoading)
    .then(returnFunc => returnFunc())
    .catch(e => console.log(e));
  }
  const rightScroll = () => {
    scrollContainer(id, {}, loadFunc, setLoading)
    .then(returnFunc => returnFunc())
    .catch(e => console.log(e));
  }

  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          (data?.length && !loading) ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={leftScroll}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={rightScroll}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {data && data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
}
