import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotesPageTemplate from '../../components/NotesPageTemplate';
import { getFavoriteNotes } from '../../services/operations/noteAPI';

const Favorites = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { favoriteNotes } = useSelector((state) => state.notes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favoriteNotes || favoriteNotes.length == 0) {
      setLoading(true);
      dispatch(getFavoriteNotes(token));
      setLoading(false);
    }
  }, []);

  return (
    <NotesPageTemplate heading={'Favorites Notes'} loading={loading} notes={favoriteNotes} favoriteNotes={favoriteNotes} />
  )
}

export default Favorites