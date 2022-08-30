import "./frontend.scss"
import React from "react"
import ReactDOM from "react-dom"
import DashboardBlock from "./blocks/DashboardBlock"
import 'bootstrap/dist/css/bootstrap.min.css'


document.addEventListener("DOMContentLoaded", () => {
  console.log("event log execute")
  const dashboardDivs = document.querySelectorAll(".dashboard-block-update-me")
  dashboardDivs.forEach(div => {
    let data = JSON.parse(div.querySelector("pre").innerText)
    ReactDOM.render(<DashboardBlock {...data} />, div)
    div.classList.remove("dashboard-block-update-me")
  })
});

