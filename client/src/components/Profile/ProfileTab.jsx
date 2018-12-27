import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./react-tabs.css";
import "./ProfileTab.css";

class ProfileTab extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <TabList>
          <Tab>
            <p className="text-center ">MY BUSINESS(ES)</p>
          </Tab>
          <Tab>
            <p className="text-center ">FAVOURITES</p>
          </Tab>
          <Tab>
            <p className="text-center ">NOTIFICATIONS</p>
          </Tab>
        </TabList>
        <TabPanel>
          <div class="row card-container">
            <div class="col-md-6">
              <div class="card mb-5 ml-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="featured1.jpg"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p class="card-text">Burger & Lobster</p>
                  <div class="cat-rewiew">
                    <p class="category ">Restaurant</p>{" "}
                    <p class="dot-seperator">•</p>{" "}
                    <p class="review">2 Reviews</p>
                  </div>
                  <ul>
                    <li>
                      <span>
                        <i class="fas fa-map-marker-alt" />
                        <span class="space-text" />{" "}
                        <p>1301 Avenue, Brooklyn, NY 11230</p>
                      </span>
                    </li>
                    <li>
                      <i class="fas fa-mobile-alt"> </i>{" "}
                      <span class="space-text" />
                      <p> +44 20 7336 8898</p>
                    </li>
                    <li>
                      <i class="fas fa-link" />
                      <span class="space-text" />
                      <p>https://burgerandlobster.com</p>
                    </li>
                  </ul>
                  <div class="card-bottom">
                    <div class="edit-icon">
                      <a
                        data-toggle="modal"
                        href="#editBusiness"
                        data-target="#editBusiness"
                        href="#"
                      >
                        {" "}
                        <i class="fas fa-edit fa-lg" />
                      </a>{" "}
                    </div>{" "}
                    <div class="trash-icon">
                      <i class="fas fa-trash-alt  fa-lg" />
                    </div>{" "}
                    <div class="fav-icon">
                      {" "}
                      <i class="fas fa-heart fa-lg" />
                    </div>
                    <p>View Business</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card mb-5 ml-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="../featured1.jpg"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p class="card-text">Burger & Lobster</p>
                  <div class="cat-rewiew">
                    <p class="category ">Restaurant</p>{" "}
                    <p class="dot-seperator">•</p>{" "}
                    <p class="review">2 Reviews</p>
                  </div>
                  <ul>
                    <li>
                      <span>
                        <i class="fas fa-map-marker-alt" />
                        <span class="space-text" />{" "}
                        <p>1301 Avenue, Brooklyn, NY 11230</p>
                      </span>
                    </li>
                    <li>
                      <i class="fas fa-mobile-alt"> </i>{" "}
                      <span class="space-text" />
                      <p> +44 20 7336 8898</p>
                    </li>
                    <li>
                      <i class="fas fa-link" />
                      <span class="space-text" />
                      <p>https://burgerandlobster.com</p>
                    </li>
                  </ul>
                  <div class="card-bottom">
                    <div class="edit-icon">
                      <a
                        data-toggle="modal"
                        href="#editBusiness"
                        data-target="#editBusiness"
                        href="#"
                      >
                        {" "}
                        <i class="fas fa-edit fa-lg" />
                      </a>{" "}
                    </div>{" "}
                    <div class="trash-icon">
                      <i class="fas fa-trash-alt  fa-lg" />
                    </div>{" "}
                    <div class="fav-icon">
                      {" "}
                      <i class="fas fa-heart fa-lg" />
                    </div>
                    <p>View Business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div class="row card-container">
            <div class="col-md-6">
              <div class="card mb-5 ml-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="featured2.jpg"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p class="card-text">Burger & Lobster</p>
                  <div class="cat-rewiew">
                    <p class="category ">Restaurant</p>{" "}
                    <p class="dot-seperator">•</p>{" "}
                    <p class="review">2 Reviews</p>
                  </div>
                  <ul>
                    <li>
                      <span>
                        <i class="fas fa-map-marker-alt" />
                        <span class="space-text" />{" "}
                        <p>1301 Avenue, Brooklyn, NY 11230</p>
                      </span>
                    </li>
                    <li>
                      <i class="fas fa-mobile-alt"> </i>{" "}
                      <span class="space-text" />
                      <p> +44 20 7336 8898</p>
                    </li>
                    <li>
                      <i class="fas fa-link" />
                      <span class="space-text" />
                      <p>https://burgerandlobster.com</p>
                    </li>
                  </ul>
                  <div class="card-bottom">
                    <div class="edit-icon">
                      <a
                        data-toggle="modal"
                        href="#editBusiness"
                        data-target="#editBusiness"
                        href="#"
                      >
                        {" "}
                        <i class="fas fa-edit fa-lg" />
                      </a>{" "}
                    </div>{" "}
                    <div class="trash-icon">
                      <i class="fas fa-trash-alt  fa-lg" />
                    </div>{" "}
                    <div class="fav-icon">
                      {" "}
                      <i class="fas fa-heart fa-lg" />
                    </div>
                    <p>View Business</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card mb-5 ml-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="featured2.jpg"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p class="card-text">Burger & Lobster</p>
                  <div class="cat-rewiew">
                    <p class="category ">Restaurant</p>{" "}
                    <p class="dot-seperator">•</p>{" "}
                    <p class="review">2 Reviews</p>
                  </div>
                  <ul>
                    <li>
                      <span>
                        <i class="fas fa-map-marker-alt" />
                        <span class="space-text" />{" "}
                        <p>1301 Avenue, Brooklyn, NY 11230</p>
                      </span>
                    </li>
                    <li>
                      <i class="fas fa-mobile-alt"> </i>{" "}
                      <span class="space-text" />
                      <p> +44 20 7336 8898</p>
                    </li>
                    <li>
                      <i class="fas fa-link" />
                      <span class="space-text" />
                      <p>https://burgerandlobster.com</p>
                    </li>
                  </ul>
                  <div class="card-bottom">
                    <div class="edit-icon">
                      <a
                        data-toggle="modal"
                        href="#editBusiness"
                        data-target="#editBusiness"
                        href="#"
                      >
                        {" "}
                        <i class="fas fa-edit fa-lg" />
                      </a>{" "}
                    </div>{" "}
                    <div class="trash-icon">
                      <i class="fas fa-trash-alt  fa-lg" />
                    </div>{" "}
                    <div class="fav-icon">
                      {" "}
                      <i class="fas fa-heart fa-lg" />
                    </div>
                    <p>View Business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel />
      </Tabs>
    );
  }
}
export default ProfileTab;
