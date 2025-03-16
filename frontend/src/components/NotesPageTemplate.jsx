import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import CardContainer from './card/CardContainer';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesSharedByMe, getNotesSharedWithMe } from '../services/operations/noteAPI';

const NotesPageTemplate = ({ heading, notes, favoriteNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState('Shared with me');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.token);
  const { notesSharedWithMe, notesSharedByMe } = useSelector((state) => state.notes);

  heading == 'Shared notes' &&
    (
      useEffect(() => {
        console.log('notesSharedWithMe', notesSharedWithMe);
        console.log('notesSharedByMe', notesSharedByMe);
        if ((!notesSharedWithMe || !notesSharedWithMe.length > 0) && tab == 'Shared with me') {
          dispatch(getNotesSharedWithMe(token, setLoading));
        }
        else if ((!notesSharedByMe || !notesSharedByMe.length > 0) && tab == 'Shared by me') {
          dispatch(getNotesSharedByMe(token, setLoading));
        }
      }, [tab])
    )

  return (
    <div className='h-[calc(100vh-3.5rem)] flex justify-center items-center overflow-auto'>
      {
        loading ?
          (
            <div className='spinner-black'></div>
          ) :
          (
            <div className='h-full w-full px-10'>

              <div className='flex justify-between items-center mt-5'>
                <p className='text-3xl font-medium'>{heading}</p>
                <div className='flex items-center gap-2 border rounded-lg py-2 px-4 bg-[#2563EB] text-white font-semibold cursor-pointer' onClick={() => setIsModalOpen(true)}>
                  <FaPlus />
                  New Note
                </div>
              </div>

              {
                heading == 'Shared notes' &&
                (
                  <div className='flex pt-4 border-b-1 border-[#E5E7EB]'>
                    <p
                      onClick={() => setTab('Shared with me')}
                      className={`px-4 py-2 cursor-pointer text-xl ${tab == 'Shared with me' && 'border-b-2 border-[#2563EB]'}`}>Shared with me</p>
                    <p
                      onClick={() => setTab('Shared by me')}
                      className={`px-4 py-2 cursor-pointer text-xl ${tab == 'Shared by me' && 'border-b-2 border-[#2563EB]'}`}>Shared by me</p>
                  </div>
                )
              }

              {/* Modal Component */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
                status={'create'}
                heading={'Create new note'}
                title={''}
                content={''}
                permission={'edit'}
              />

              {
                heading !== 'Shared notes' ?
                  (
                    <CardContainer notes={notes} favoriteNotes={favoriteNotes} />
                  ) :
                  (
                    <CardContainer notes={tab == 'Shared with me' ? notesSharedWithMe : notesSharedByMe} favoriteNotes={favoriteNotes} tab={tab} />
                  )
              }

            </div>
          )
      }
    </div>
  )
}

export default NotesPageTemplate