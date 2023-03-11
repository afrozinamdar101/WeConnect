import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {page !== "login" && (
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
    )}

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

    {page !== "login" && (
      <>
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
            You can use this secret question to reset your password if forgotten
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
      </>
    )}

    <div className="form-group p-2">
      <button
        disabled={
          page !== "login"
            ? !name || !email || !password || !secret
            : !email || !password
        }
        className="btn btn-primary col-12"
      >
        {loading ? (
          <SyncOutlined spin className="py-1" />
        ) : page !== "login" ? (
          "Submit"
        ) : (
          "Login"
        )}
      </button>
    </div>
  </form>
);

export default AuthForm;
