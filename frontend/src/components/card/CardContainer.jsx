import React from 'react'
import Card from './Card'

const CardContainer = ({ notes, favoriteNotes, tab, isTrashPage = false }) => {
    return (
        <div className={`mt-5 ${notes && notes.length > 0 ? 'grid grid-cols-3 auto-rows-fr gap-x-6' : 'flex items-center justify-center h-[70vh]'}`}>
            {
                notes && notes.length > 0 ?
                    (
                        notes.map((note) => (
                            <Card
                                key={note._id}
                                note={note}
                                isFavorite={favoriteNotes.some(favNote => favNote._id === note._id)}
                                tab={tab}
                                isTrashPage={isTrashPage}
                            />
                        ))
                    ) :
                    (
                        <p className="text-gray-500 text-center text-2xl">No notes found</p>
                    )
            }
        </div>
    )
}

export default CardContainer