import React, { Component } from 'react'
import { FormInline, Input, Button} from 'mdbreact'
class SearchBusiness extends Component{
    render () {
        return (
            <div>
<FormInline>
  <Input label="Business Name" icon="envelope" group type="text" />
  <Input label="Location" icon="lock" group type="text" />
  <Button>Login</Button>
</FormInline>                
            </div>

        )
    }
}
export default SearchBusiness;
