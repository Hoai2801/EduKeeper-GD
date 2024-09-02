import React, {useContext} from 'react'
import editIcon from '../assets/edit-246.png'
import {JWTContext} from "../App";

const UserRow = ({user, setEditUser, setIsEditOpen}) => {
    const userJWT = useContext(JWTContext)?.user;

    const handleUserEdit = () => {
        setEditUser({
            staffCode: user.staffCode,
            username: user.username,
            email: user.email,
            accountLocked: user.accountLocked,
            role: user.roles.name
        });
        setIsEditOpen(true);
    }
    return (
        <tr key={user.id}
            className={`p-2 mt-5 ${user.enabled ? "bg-white" : "bg-gray-100"} w-full`}>
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.username}</td>
            <td className="px-4 py-2">{user.staffCode}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.roles.name}</td>
            <td className="px-4 py-2">{!user.accountLocked ?
                <span className='border border-green-500 rounded-3xl p-2 text-sm text-green-400'>Hoạt động</span> :
                <span className='border border-red-500 rounded-3xl p-2 text-sm text-red-400'>Khóa</span>}</td>
            <td className="px-4 py-2">{new Date(user.createdDate).toLocaleDateString()}</td>
            <div>
                <td className="px-4 py-2 flex gap-10">
                    <div
                        className={`${(user.roles.name === "ROLE_ADMIN" || user.roles.name === "ROLE_SUB-ADMIN") && userJWT?.role === "ROLE_SUB-ADMIN" ? "hidden" : ""}`}>
                        <button className='mt-2' onClick={handleUserEdit}>
                            <img src={editIcon} alt="" className='w-5 h-5'/>
                        </button>
                    </div>
                </td>
            </div>
        </tr>
    )
}

export default UserRow