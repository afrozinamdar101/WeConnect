import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/Link";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
        name,
        email,
        password,
        secret
      });
      setName("");
      setEmail("");
      setPassword("");
      setSecret("");
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    } 
};


  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Your name</label>
              </small>
              <input

                onChange={(e) => setName(e.target.value)}
                value={name}

                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Email adddress</label>
              </small>
              <input

                onChange={(e) => setEmail(e.target.value)}
                value={email}

                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Password</label>
              </small>
              <input

                onChange={(e) => setPassword(e.target.value)}
                value={password}

                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Pick a question</label>
              </small>
              <select className="form-control">
                <option>What is your favorite color?</option>
                <option>Who was your first best friend?</option>
                <option>Which city were you born?</option>
              </select>

              <small className="form-text text-muted">
                You can use this secret question to reset your password if
                forgotten
              </small>
            </div>

            <div className="form-group p-2">
              <input

                onChange={(e) => setSecret(e.target.value)}
                value={secret}

                type="text"
                className="form-control"
                placeholder="Write your answer here"
              />
            </div>

            <div className="form-group p-2">
              <button disabled={!name || !email || !password || !secret}
              className="btn btn-primary col-12">
                { loading ? <SyncOutlined spin className="py-1" /> : "Submit" }
                </button>
            </div>
          </form>
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
      </div>
    </div>
  );
};

export default Register;
