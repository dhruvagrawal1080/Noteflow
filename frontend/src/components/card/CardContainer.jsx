import React from "react";
import Card from "./Card";

const CardContainer = ({ notes, favoriteNotes, tab, isTrashPage = false }) => {
    return (
        <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <Card
                        key={note._id}
                        note={note}
                        isFavorite={favoriteNotes.some(favNote => favNote._id === note._id)}
                        tab={tab}
                        isTrashPage={isTrashPage}
                    />
                ))
            ) : (
                <div className="col-span-full flex items-center justify-center h-[50vh]">
                    <p className="text-gray-500 text-center text-2xl">No notes found</p>
                </div>
            )}
        </div>
    );
};

export default CardContainer;
