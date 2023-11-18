const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-90"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
