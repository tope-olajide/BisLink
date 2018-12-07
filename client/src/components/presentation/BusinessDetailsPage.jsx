import React, { Component } from 'react';
import { Input, Button } from 'mdbreact';
import './style.css'
class BusinessDetailsPage extends Component {
    render () {
        return (
            <div>
            <main role="main" class="container">
              <div class="row">
                <div class="col-md-8 blog-main">
                  <div class="card review-card mt-3 p-4 biz-desciption">
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
                  <div class="card review-card  p-3 my-3">
                    <strong>
                      <h2 className= 'text-center'> 22 Reviews</h2>
                    </strong>
                    <div class="row mt-5 user-review">
                      <div class="commenter-avatar col-md-3">
                        <img
                          class="pt-0"
                          src="customer-img1.jpg"
                          alt="Card image cap"
                        />{" "}
                        <br />
                        <p class="">Adeola</p>
                      </div>
                      <div class="commenter-review col-md-9">
                        <h4 class="text-left pt-0">
                          Best noodles in the Newyork city
                        </h4>
                        <p class="text-left">
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
                    <div class="row mt-5 user-review">
                      <div class="commenter-avatar col-md-3">
                        <img
                          class="pt-0"
                          src="customer-img2.jpg"
                          alt="Card image cap"
                        />{" "}
                        <br />
                        <p class="">Adeboye</p>
                      </div>
                      <div class="commenter-review col-md-9">
                        <h4 class="text-left pt-0">
                          A hole-in-the-wall old school shop
                        </h4>
                        <p class="text-left">
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
                  <div class="card review-card p-5 mt-3 mb-2">
                  
                    <h4 class=" light-color light-text text-center px-3 mb-5">
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
    
                <aside class="col-md-4 blog-sidebar">
                  <div class="card mt-3 shadow-sm">
                    <img
                      class="card-img-top"
                      src="map.jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body card-contents">
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
                    </div>
                  </div>
                  <div class="card mt-3 p-3">
                    <div class="profile-section-biz-details">
                      <img
                        src="follow-img.jpg"
                        class="mx-auto d-block"
                      />
                      <div class=" profile-text">
                        <h5 class="py-1">Mercy Johnson</h5>
                        <p>Lagos</p>
                      </div>
                      <table class="table table-bordered mt-3">
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
                      </table>
                      <p class="text-center">
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