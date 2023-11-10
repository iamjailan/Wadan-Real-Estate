const signUp = (req, res) => {
  res.json({ msg: "Auth User Routes" });
};

const signIn = (req, res) => {
  res.json({ msg: "Login User Routes" });
};

export { signIn, signUp };
