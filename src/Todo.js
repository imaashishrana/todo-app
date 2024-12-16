import React, { useState } from 'react';

const Todo = () => {

    const [initial, setInitial] = useState("");
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const getInput = (e) => {
        setInitial(e.target.value);
    };

    const getData = () => {
        if (initial.trim()) {
            if (isEditing) {
                const updatedData = data.map((item, index) => 
                    index === currentIndex ? initial : item
                );
                setData(updatedData);
                setIsEditing(false);
                setCurrentIndex(null);
            } else {
                const store = [...data, initial];
                setData(store);
            }
            setInitial("");
        }
    };

    const deleteTask = (index) => {
        const filterData = data.filter((_, id) => id !== index);
        setData(filterData);
    };

    const editTask = (index) => {
        setIsEditing(true);
        setCurrentIndex(index);
        setInitial(data[index]);
    };

    return (
        <>
            <div className="container flex justify-center items-center min-h-screen bg-gray-100">
                <div className="inputTask bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-96">
                    <input
                        type="text"
                        value={initial}
                        onChange={getInput}
                        placeholder="Enter your task"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                    />
                    <button
                        onClick={getData}
                        className={`w-full ${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'} text-white py-2 rounded-lg transition duration-300`}
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                    <div className="mt-4">
                        {data.map((currVal, index) => (
                            <div
                                key={index}
                                className="taskData flex justify-between items-center bg-gray-50 px-4 py-2 mt-2 rounded-lg shadow-sm"
                            >
                                <p className="text-gray-800 truncate">{currVal}</p>
                                <div className="flex space-x-2">
                                    <i
                                        onClick={() => editTask(index)}
                                        className="ri-edit-line text-blue-500 cursor-pointer hover:text-blue-700"
                                    ></i>
                                    <i
                                        onClick={() => deleteTask(index)}
                                        className="ri-delete-bin-fill text-red-500 cursor-pointer hover:text-red-700"
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
