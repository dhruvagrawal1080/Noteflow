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
    <>
      <NotesPageTemplate heading={'Trashed Notes'} notes={trashedNotes} isTrashPage={true} />
      {/* {
        (trashedNotes && trashedNotes.length > 0) &&
        (
          <div className="text-center mt-5 absolute top-1 right-1/2 transform translate-x-1/2">
            <p className="text-2xl font-semibold text-gray-400">Notes will be deleted in 30 days</p>
          </div>
        )
      } */}
    </>
  )
}

export default Trash