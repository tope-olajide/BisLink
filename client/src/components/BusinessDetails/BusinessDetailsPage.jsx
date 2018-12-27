import React, { Component } from 'react';
import { Input, Button } from 'mdbreact';
import './style.css'
class BusinessDetailsPage extends Component {
    render () {
        return (
            <div>
            <main role="main" className="container">
              <div className="row">
                <div className="col-md-7 blog-main">
                  <div className="card review-card mt-3 p-4 biz-desciption">
                    <p>
                      Tasty Hand-Pulled Noodles is a 1950s style diner located in
                      Madison, Wisconsin. Opened in 1946 by Mickey Weidman, and
                      located just across the street from Camp Randall Stadium, it
                      has become a popular game day tradition amongst many Badger
                      fans. The diner is well known for its breakfast selections,
                      especially the Scrambler, which is a large mound of potatoes,
                      eggs, cheese, gravy, and a patrons’ choice of other toppings
                    </p>
                    <p>
                      Mickies has also been featured on “Todd’s Taste of the Town”
                      during one of ESPN’s college football broadcasts. We are one
                      of the best Chinese restaurants in the New York, New York
                      area. We have been recognized for our outstanding Chinese &
                      Asian cuisine, excellent Chinese menu, and great restaurant
                      specials. We are one of the best Chinese restaurants in the
                      New York, New York area. We have been recognized for our
                      outstanding Chinese & Asian cuisine, excellent Chinese menu,
                      and great restaurant specials.
                    </p>
                  </div>
                  <div className="card review-card  p-3 my-3">
                    <strong>
                      <h2 className= 'text-center'> 22 Reviews</h2>
                    </strong>
                    <div className="row mt-5 user-review">
                      <div className="commenter-avatar col-md-3">
                        <img
                          className="pt-0"
                          src="../customer-img1.jpg"
                          alt="Card image cap"
                        />{" "}
                        <br />
                        <p className="">Adeola</p>
                      </div>
                      <div className="commenter-review col-md-9">
                        <h4 className="text-left pt-0">
                          Best noodles in the Newyork city
                        </h4>
                        <p className="text-left">
                          I love the noodles here but it is so rare that I get to
                          come here. Tasty Hand-Pulled Noodles is the best type of
                          whole in the wall restaurant. The staff are really nice,
                          and you should be seated quickly. I usually get the hand
                          pulled noodles in a soup. House Special #1 is amazing and
                          the lamb noodles are also great. If you want your noodles
                          a little chewier, get the knife cut noodles, which are
                          also amazing. Their dumplings are great dipped in their
                          chili sauce.
                        </p>
                      </div>
                    </div>
                    <div className="row mt-5 user-review">
                      <div className="commenter-avatar col-md-3">
                        <img
                          className="pt-0"
                          src="../customer-img2.jpg"
                          alt="Card image cap"
                        />{" "}
                        <br />
                        <p className="">Adeboye</p>
                      </div>
                      <div className="commenter-review col-md-9">
                        <h4 className="text-left pt-0">
                          A hole-in-the-wall old school shop
                        </h4>
                        <p className="text-left">
                          The dumplings were so greasy...the pan-fried shrimp
                          noodles were the same. So much oil and grease it was
                          difficult to eat. The shrimp noodles only come with 3
                          shrimp (luckily the dish itself is cheap) The beef noodle
                          soup was okay. I added black vinegar into the broth to
                          give it some extra flavor. The soup has bok choy which I
                          liked - it's a nice textural element. The shop itself is
                          really unclean (which is the case in many restaurants in
                          Chinatown) They don't wipe down the tables after customers
                          have eaten. If you peak into the kitchen many of their
                          supplies are on the ground which is unsettling...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card review-card p-5 mt-3 mb-2">
                  
                    <h4 className=" light-color light-text text-center px-3 mb-5">
                      <strong>Write a Review</strong>
                    </h4>
                    <form>
                      
                      <div className="grey-text">
                        <Input label="Title" icon="pencil" />
                        <Input
                          type="textarea"
                          label="Review"
                          icon="pencil"
                          rows="3"
                        />
                      </div>
                      <div className="text-center">
                        <Button>Submit Review</Button>
                      </div>
                    </form>
                  </div>
                </div>
    
                <aside className="col-md-5 blog-sidebar">
                  <div className="card mt-3 shadow-sm">
                    <img
                      className="card-img-top"
                      src="../map.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body card-contents">
                      <ul>
                        <li>
                          <span>
                            <i className="fas fa-map-marker-alt" />
                            <span className="space-text" />{" "}
                            <p>1301 Avenue, Brooklyn, NY 11230</p>
                          </span>
                        </li>
                        <li>
                          <i className="fas fa-mobile-alt"> </i>{" "}
                          <span className="space-text" />
                          <p> +44 20 7336 8898</p>
                        </li>
                        <li>
                          <i className="fas fa-link" />
                          <span className="space-text" />
                          <p>https://burgerandlobster.com</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mt-3 p-3">
                    <div className="profile-section-biz-details">
                      <img
                        src="../../follow-img.jpg"
                        className="mx-auto d-block"
                      />
                      <div className=" profile-text">
                        <h5 className="py-1">Mercy Johnson</h5>
                        <p>Lagos</p>
                      </div>
                      
                      <table className="table table-bordered mt-3">
                      <tbody>
                        <tr>
                          <th scope="col">
                            <h4>23</h4>
                            <p>Business</p>
                          </th>
                          <th scope="col">
                            <h4>45</h4>
                            <p>Followers</p>
                          </th>
                          <th scope="col">
                            <h4>34</h4>
                            <p>Following</p>
                          </th>
                        </tr>
                        </tbody>
                      </table>
                      <p className="text-center">
                        Hi ! My name is Mercy Johnson. I'm a UI/UX Designer from
                        Lagos, in Nigeria. I really enjoy photography and mountains.
                      </p>
                      <div className="text-center mt-3">
                        <Button> Follow </Button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </main>
          </div>
        )
    }
}
export default BusinessDetailsPage;