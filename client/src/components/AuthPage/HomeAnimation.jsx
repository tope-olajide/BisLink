import React from 'react';
import '../../styles/cb-slideshow.css';

class HomeAnimation extends React.Component {
render () {
    return (
        <div>
            <ul className="cb-slideshow">
<li><span>Image 01</span>
  <div>
    <h3>{this.props.caption1}
    </h3>
  </div>
</li>
<li><span>Image 02</span>
  <div>
    <h3>
    {this.props.caption2}
    </h3>
  </div>
</li>
<li><span>Image 03</span>
  <div>
    <h3>{this.props.caption3} </h3>
  </div>
</li>
<li><span>Image 04</span>
  <div>
    <h3>{this.props.caption4} </h3>
  </div>
</li>
<li><span>Image 05</span>
  <div>
    <h3>{this.props.caption5}</h3>
  </div>
</li>
<li><span>Image 06</span>
  <div>
    <h3>{this.props.caption6}</h3>
  </div>
</li>
</ul>
        </div>
    )
}
}
export default HomeAnimation;
