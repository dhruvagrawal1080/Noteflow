import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotesPageTemplate from '../../components/NotesPageTemplate';
import { getTrashedNotes } from '../../services/operations/noteAPI';

const Trash = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { trashedNotes } = useSelector((state) => state.notes);

  useEffect(() => {
    if (!trashedNotes || trashedNotes.length == 0) {
      dispatch(getTrashedNotes(token));
    }
  }, []);

  return (
    <NotesPageTemplate heading={'Trashed Notes'} notes={trashedNotes} isTrashPage={true} />
  )
}

export default Trash