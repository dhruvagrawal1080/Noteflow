import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotesPageTemplate from '../../components/NotesPageTemplate';
import { getNotes } from '../../services/operations/noteAPI';

const MyNotes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { myNotes, favoriteNotes } = useSelector((state) => state.notes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!myNotes || myNotes.length == 0) {
      setLoading(true);
      dispatch(getNotes(token));
      setLoading(false);
    }
  }, []);

  return (
    <NotesPageTemplate heading={'My Notes'} loading={loading} notes={myNotes} favoriteNotes={favoriteNotes} />
  )
}

export default MyNotes;
