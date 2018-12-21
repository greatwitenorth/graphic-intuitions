import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
import { Cell, Grid } from "styled-css-grid";
import styled from "styled-components";
import { ButtonOrange } from "../../css/theme";

const StyledForm = styled.form`
  input, textarea{
    display: block;
    width: 100%;
    padding: 10px;
    font-weight: normal;
    &::placeholder{
      color: #bebebe;
    }
  }
  
  .field{
    margin-bottom: 20px;
  }
  
  label{
    display: none;
  }
`

const SubmitButton = styled.button`
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  background: linear-gradient(180deg, #FF782D 0%, #FF2D2D 100%);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 25px 90px;
  font-size: 20px;
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };
  
  render() {
    return (
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598.817124093776!2d-97.36559048430794!3d49.355609779339325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c18ef448aa6111%3A0x9d07b36d48fb4507!2sGraphic+Intuitions!5e0!3m2!1sen!2sca!4v1545323471665\" width=\"100%\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen></iframe>" }}/>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
              <p>If you have a question about our services, don’t hesitate to call or contact us using the form below.</p>
              <Grid>
                <Cell width={5}>
                  <StyledForm
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact"/>
                    <div hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input name="bot-field" onChange={this.handleChange}/>
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"name"}>Your name</label>
                      <div className="control">
                        <input className="input" placeholder={"Your Name"} type={"text"} name={"name"} onChange={this.handleChange} id={"name"} required={true}/>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"email"}>Email</label>
                      <div className="control">
                        <input className="input" placeholder={"Email"} type={"email"} name={"email"} onChange={this.handleChange} id={"email"} required={true}/>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"message"}>Message</label>
                      <div className="control">
                        <textarea className="textarea" rows="7" placeholder={"Message"} name={"message"} onChange={this.handleChange} id={"message"} required={true}/>
                      </div>
                    </div>
                    <div className="field">
                      <SubmitButton type="submit">Send</SubmitButton>
                    </div>
                  </StyledForm>
                </Cell>
                <Cell width={5} left={7}>
                  <ul>
                  <li>125 Charles Ave E<br />Morris, MB<br />R0G 1K0</li>
                  <li><a href="tel:2047466177">204.746.6177</a></li>
                  </ul>
                </Cell>
              </Grid>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}