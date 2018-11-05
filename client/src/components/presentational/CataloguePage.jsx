import React, {Component} from 'react'
import './CataloguePage.css'
import { FormInline, Input, Button} from 'mdbreact'

class CataloguePage extends Component{
    render (){
        return(<div>
<div className = "header">
<h1 className ='hero-title'> Discover great places in Nigeria</h1>
<p className ='hero-paragraph'>Let's uncover the best places to eat, drink, and shop nearest to you.</p>
<FormInline className ='search-container'>
  <Input label="Business Name" icon="envelope" group type="text" />
  <Input label="Location" icon="lock" group type="text" />
  <Button>Search</Button>
</FormInline>                


</div>
</div>
        )
    }
}
export default CataloguePage