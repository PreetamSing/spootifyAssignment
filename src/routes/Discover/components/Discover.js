import React, { useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useDiscover } from '../../../contexts/DiscoverContext';

const Discover = ({ error }) => {
  const {
    newReleases,
    playlists,
    categories,
    getNewReleases,
    getPlaylists,
    getCategories
  } = useDiscover();

  useEffect(() => {
    if (!error) {
      getNewReleases();
      getCategories();
      getPlaylists();
    }
  }, [])

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} loadFunc={getNewReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} loadFunc={getPlaylists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" loadFunc={getCategories} />
    </div>
  );
}

export default Discover;