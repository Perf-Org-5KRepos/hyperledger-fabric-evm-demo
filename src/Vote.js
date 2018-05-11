import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import * as dapp from "./dapp";
import loaderIcon from "./assets/images/loader_duo.svg";
import arrow from "./assets/images/arrow-left.svg";
import diagram from "./assets/images/diagram.png";
import "./vote.css";

class Vote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const checkbox1 = document.querySelector("#optionA");
        const checkbox2 = document.querySelector("#optionB");
        checkbox1.removeAttribute("checked");
        checkbox2.removeAttribute("checked");
        this.setState({
            selectedOption: e.target.value,
        })
        e.target.setAttribute("checked", "");
        if (checkbox1.hasAttribute("checked")) {
            console.log("button 1 is checked.");
            console.log(checkbox1.parentElement);
            checkbox2.parentElement.classList.remove("radio-selected-label");
            checkbox1.parentElement.classList.add("radio-selected-label");
        } else if (checkbox2.hasAttribute("checked")) {
            console.log("button 2 is checked.");
            console.log(checkbox2.parentElement);
            checkbox1.parentElement.classList.remove("radio-selected-label");
            checkbox2.parentElement.classList.add("radio-selected-label");
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting form");
        console.log("This should show immediately.");
        if (this.state.selectedOption === "option1") {
            console.log("This should show immediately.");
            this.setState({ loading: true });
            // if vote A is selected
            // awesome was selected
            dapp.voteA();
            setTimeout(() => {
                this.props.history.push("/results");
            }, 2000);
            // console.log("Voting for option A");
        } else {
            console.log("This should show immediately.");
            this.setState({ loading: true });
            // if vote B is selected
            // fantastic was selected
            dapp.voteB();
            setTimeout(() => {
                this.props.history.push("/results");
            }, 2000);
            // console.log("Voting for option B");
        }
    }



    render() {
        return <div className="vote__container">
            <Link to="/" className="arrow__container">
              <img src={arrow} alt="Arrow icon" className="back__arrow" />
            </Link>
            <h1 className="ibm-light">Question</h1>
            <p>
              How awesome is it that you can have Hyperledger Burrow&quote;s
              Ethereum VM smart contract engine running as chaincode
              inside Hyperledger Fabric?
            </p>
            <p className="ibm-label">*After submitting your vote, an Ethereum smart contract will be executed on HyperLedger Fabric.</p>
            <form onSubmit={this.handleSubmit} action="POST">
              <div className="radio__button--container">
                <div className="radio">
                  <label htmlFor="optionA" className="radio-label">
                    <input id="optionA" name="radio" type="radio" value="option1" onChange={this.handleChange} checked={this.state.selectedOption === "option1"} />
                    Awesome
                  </label>
                </div>
                <div className="radio">
                  <label htmlFor="optionB" className="radio-label">
                    <input id="optionB" name="radio" type="radio" value="option2" onChange={this.handleChange} checked={this.state.selectedOption === "option2"} />
                    Fantastic
                  </label>
                </div>
                <button disabled={!this.state.selectedOption} className="duo__btn submit__vote--btn" type="submit" value="Submit" name="submit">
                {
                    this.state.loading
                        ? <img src={loaderIcon} alt="Loading icon" className="loading__spinner" />
                        : "Submit"
                }
                </button>
              </div>
            </form>
            <div className="side__panel--container">
                <h1>HyperLedger Fabric with EVM Architecture</h1>
                <img src={diagram} alt="" className="diagram__image" />
                <p>
                    A Web3-based client interacts with our Web3->Hyperledger
                    Fabric SDK proxy server to send/receive API calls to the
                    Fabric network components enabling Ethereum developers
                    to interact with Hyperledger Fabric just as they would
                    with Ethereum.
              </p>
            </div>
          </div>;
    }
}

export default withRouter(Vote);
