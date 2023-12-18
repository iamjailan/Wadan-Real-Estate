import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailed,
  signOutUserStart,
  signOutUserSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = React.useState(undefined);
  const [filePer, setFilePer] = React.useState(0);
  const [fileUploadError, setFileUploadError] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [userUpdateIsSuccess, setUserUpdateIsSuccess] = React.useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleDeleteUser = async () => {
    try {
      deleteUserStart();
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
        console.log(error, fileUploadError);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      setUserUpdateIsSuccess(false);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data));
      setUserUpdateIsSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserUpdateIsSuccess(false);
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch("/api/auth/signOut");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutUserFailed(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailed(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
      console.log(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const deleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      console.log(data);
      setUserListing((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          type="file"
          ref={fileRef}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2"
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePer}`}</span>
          ) : filePer === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-90"
        >
          {loading ? "UPDATING..." : "UPDATE"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      {error && <p className="text-sm text-center text-red-700">{error}</p>}
      {userUpdateIsSuccess && (
        <p className="text-sm text-center text-green-700">
          Your Information Updated
        </p>
      )}
      <button
        onClick={handleShowListing}
        className="text-green-500 text-lg font-semibold w-full"
      >
        Show listing
      </button>
      <p className="text-red-500 w-full text-lg text-center my-3">
        {showListingError && "an error happened!"}
      </p>
      {userListing &&
        userListing.length > 0 &&
        userListing.map((listing) => {
          return (
            <div
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
              key={listing._id}
            >
              <Link to={`/listings/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain"
                  src={listing.imageUrl[0]}
                  alt="listing cover"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  className="text-red-700 uppercase"
                  onClick={() => deleteListing(listing._id)}
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Profile;
