import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NotesPageTemplate from '../../components/NotesPageTemplate';


const SharedNotes = () => {
  const { favoriteNotes } = useSelector((state) => state.notes);
  const [loading, setLoading] = useState(false);

  return (
    <NotesPageTemplate heading={'Shared notes'} loading={loading} setLoading={setLoading} notes={''} favoriteNotes={favoriteNotes} />
  )
}

export default SharedNotes