import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiMailSend } from 'react-icons/bi'

import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [userpic, setUserpic] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const getCUrrentUser = async () => {
      const { data } = await apiService.getCurrentUser(user._id)
      setCurrentUser(data)
    }
    getCUrrentUser()
  }, [])

  const updateUserpic = async (e) => {
    const cloudName = process.env.CD_CLOUD_NAME || 'dzediojcr'
    const preset = process.env.CD_PRESET || 'tasky_images'

    const formData = new FormData()
    formData.append('file', userpic)
    formData.append('upload_preset', preset)
    formData.append('cloud_name', cloudName)

    try {
      // upload new pic to CD
      const cdUrl = 'https://api.cloudinary.com/v1_1/dzediojcr/image/upload'
      const { data } = await axios.post(cdUrl, formData)

      // set new Pic
      setCurrentUser({ ...currentUser, userpic: data.url })
    } catch (err) {
      console.warn(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateUserpic()
      await apiService.updateUser(currentUser)

      return navigate('/profile')
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <div className="flex justify-center">
      {/* <UserCard
        {...user}
        setImage={setImage}
        handleUpdateUserpic={handleUpdateUserpic}
      /> */}

      {/* IMAGE */}

      <div className="w-full">
        <div className="mt-2 flex flex-col items-center lg:mt-0 mx-2">
          {/* Profile Info */}
          <>
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <img
              className="object-cover mx-auto rounded-lg block shrink-0 w-40 h-40"
              src={currentUser?.userpic || 'http://placekitten.com/300/300'}
              alt={''}
            />
            <div>
              <h3 className="text-base capitalize py-2">
                {currentUser?.fullName}
              </h3>
              <h5 className="text-sm">@{currentUser?.username}</h5>
            </div>
            {/* Email */}
            <div className="mt-6 space-y-8 md:mt-8 items-center">
              <div className="flex flex-row mx-auto items-end">
                <BiMailSend size={20} />
                <div className="text-sm mx-2 text-gray-700 truncate w-full dark:text-gray-400">
                  {currentUser?.email}
                </div>
              </div>
            </div>
          </>

          {/* Profile Inputs */}
          <div className="flex flex-col justify-center items-center align-baseline w-96">
            <form className="mt-10 w-full text-center" onSubmit={handleSubmit}>
              <div className="form-control py-4">
                <div className="-mx-2 md:items-center w-full">
                  <div className="">
                    <label className="label ml-8">
                      <div className="label-text">Full Name</div>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={currentUser?.fullName || ''}
                      placeholder={currentUser?.fullName || ''}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          fullName: e.target.value,
                        })
                      }
                      className="input input-bordered w-full max-w-xs capitalize"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <label className="label ml-8">
                      <div className="label-text">Username</div>
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder={`@${currentUser?.username}` || ''}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="ml-8 label">
                      <div className="label-text">Email address</div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder={currentUser?.email || ''}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                  </div>
                </div>

                <div className="ml-12 mt-4 md:mt-0">
                  <input
                    type="file"
                    name="userpic"
                    onChange={(e) => setUserpic(e.target.files[0])}
                    className="block w-full text-sm text-primary bg-blend-darken py-4
                file:mr-4 file:py-1 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white"
                  />
                </div>

                <div className="text-center py-4">
                  <button className="btn btn-wide btn-outline btn-primary">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
