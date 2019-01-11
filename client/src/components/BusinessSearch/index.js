import React, {Component} from "react";
import searchBusinessPage from './searchBusiness'
import NavigationBar from "../commons/NavigationBar";
class searchBusiness extends Component {
  render() {
    return (<>
    <NavigationBar />
    <h1 className = 'text-center'>Search Results</h1>
    <searchBusinessPage
    
    />
    </>
     
    );
  }
}
export default searchBusiness
