import React, { useContext, useState } from "react";
import * as api from '../api/index.js';

const DiscoverContext = React.createContext()

export function useDiscover() {
    return useContext(DiscoverContext)
}

export function DiscoverProvider({ children }) {
    const [newReleases, setNewReleases] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [categories, setCategories] = useState([])
    const getAccessToken = async (setLoading, setError) => {
        try {
            const { data } = await api.authorize();
            localStorage.setItem('accessToken', data.access_token);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error?.error);
            setLoading(false);
        }
    }

    const getNewReleases = async () => {
        try {
            const { data } = await api.fetchNewReleases(newReleases.length);
            if (data.albums.items.length !== 0)
                setNewReleases(p => [...p, ...data.albums.items]);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const { data } = await api.fetchCategories(categories.length)
            if (data.categories.items.length !== 0)
                setCategories(p => [...p, ...data.categories.items]);
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaylists = async () => {
        try {
            const { data } = await api.fetchFeaturedPlaylists(playlists.length);
            if (data.playlists.items.length !== 0)
                setPlaylists(p => [...p, ...data.playlists.items]);
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        newReleases,
        categories,
        playlists,
        getAccessToken,
        getNewReleases,
        getCategories,
        getPlaylists
    }

    return (
        <DiscoverContext.Provider value={value}>
            { children}
        </DiscoverContext.Provider>
    )
}
