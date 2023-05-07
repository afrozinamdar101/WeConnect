import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
    } catch (err) {
      toast(err.response.data);
      //console.log(err);
      setLoading(false);
    }
  };

  // state?.token && router.push("/");
  if (state && state.token) router.push("/");

  return (
    <div className="Background">
      <img src="/images/logo.png" alt="logo_big" style={{width:"250px", marginTop:"10px"}} />
      <div className="container-fluid">
        <div className="row text-light ">
          <div className="col text-center">
            <h1 style={{  textShadow: '2px 2px 8px #000' }}>Register</h1>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <AuthForm
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
              <p>You have successfully registered.</p>
              <Link href="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </Modal>
          </div>

          <div className="row">
            <div className="col">
              <p className="text-center">
                Already registered?
                <Link href="/login"> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
