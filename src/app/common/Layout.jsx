import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import { Header, SideNav } from './index';
import { ModalPhoto } from './modal/index';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  toggleMobileMenu() {
    let x = document.getElementById("left-nav");
    x.classList.toggle("responsive");
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />

          <link rel="stylesheet" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css" />
        </Helmet>
        <Header toggleMobileMenu={this.toggleMobileMenu} />
        <SideNav toggleMobileMenu={this.toggleMobileMenu} />
        <ModalPhoto />
        {this.props.children}
      </Fragment>
    )
  }
}
export default Layout;
