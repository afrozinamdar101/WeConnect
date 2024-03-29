import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  // profile image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });

      console.log(data);

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update user in local storage keeping the token same
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        // update context
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("Uploaded image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="dash_bg">
      <div className="container-fluid" style={{ maxWidth: "1200px" }}>
        <div className="row py-5 text-light">
          <div className="col text-center">
            <h1>Profile</h1>
          </div>
        </div>

        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            {/* upload image */}
            <label className="d-flex justify-content-center h5">
              {image && image.url ? (
                <Avatar size={30} src={image.url} className="mt-2" />
              ) : uploading ? (
                <LoadingOutlined className="mt-2" />
              ) : (
                <CameraOutlined className="mt-2" style={{color: "gold", fontSize: '2em'}} />
              )}
              <input
                onChange={handleImage}
                type="file"
                accept="images/*"
                hidden
              />
            </label>
            <AuthForm
              profileUpdate={true}
              username={username}
              setUsername={setUsername}
              about={about}
              setAbout={setAbout}
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Modal
              title="Congratulations!"
              open={ok}
              onCancel={() => setOk(false)}
              footer={null}
            >
              <p>You have successfully updated your profile.</p>
            </Modal>
          </div>

          <div className="row">
            <div className="col">
              <p className="text-center" style={{color: "white"}}>
                Already registered?
                <Link href="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
