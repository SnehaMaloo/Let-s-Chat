import userIcon from '../../miscellaneous/userIcon.png';

const UserListItem = ({user,handleFunction}) => 
{
  return (
    <>
      <div onClick={handleFunction} className='user-list-item overflow-x-scroll noscrollbar'>
          <div className='col-3 py-3 px-2'>
          <img src={user?user.pic:userIcon} alt="Avatar" className="rounded-circle img-fluid"/>
          </div>
              <div className='mt-3 px-2 col-9'>
                <h6 className='text-center font-monospace fw-bold fs-5' >{user.name}</h6>
                <p className='text-center font-monospace '><b>Email:</b>{user.email}</p>
              </div>
      </div>
    </>
  )
}

export default UserListItem
