import React from 'react';
import BusinessCatalog from "./components/business/BusinessCatalog";
import BusinessProfile from "./components/business/BusinessProfile";
import LoginForm from "./components/user/Loginform";
import HomeCarousel from "./components/home/Carousel";
import SearchPage from "./components/business/searchpage";
import SignupForm from "./components/user/SignupForm";
import BusinessRegistration from "./components/business/RegisterBusiness";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import LogOut from "./components/user/Logout";
import EditBusiness from "./components/business/Editbusiness";
import SearchResults from "./components/business/SearchResults";
import UserProfile from "./components/user/UserProfile"




class App extends React.Component {
constructor(props){
    super(props);
    this.state = {
        isAuthenticated: false
    };    

}

getAuth = ()=>{
    return this.state.isAuthenticated
};

setAuth = ()=>{
    this.setState({isAuthenticated: true})
};

unsetAuth = ()=>{
    this.setState({isAuthenticated: false})
};


 render(){

      const Routes = () => (
          <Router>
              <div>
                  <Route exact strict path="/register" component={()=> <BusinessRegistration getAuth={this.getAuth()}/>}/>
                  <Route exact strict path="/logout" render={(props)=><LogOut {...props} getAuth={this.getAuth}/>}/>
                  <Route exact strict path='/businesses' component={BusinessCatalog}/>
                  <Route exact strict path='/search' component={()=><SearchPage getAuth={this.getAuth}/>}/>
                  <Route exact strict path="/" component={() => <HomeCarousel getAuth={this.getAuth}/> } />
                  <Route exact strict path="/login" component={() => <LoginForm unsetAuth={this.unsetAuth}
                                                                                setAuth={this.setAuth}
                                                                                getAuth={this.getAuth}/>} />
                  <Route exact strict path="/signup" component={()=> <SignupForm getAuth={this.getAuth}/>} />
                  <Route exact path="/authuser/userprofile" component={()=> <UserProfile getAuth={this.getAuth}/>} />
                  <Route exact strict path="/businesses/:business_id" render={(props)=><BusinessProfile {...props}/>}/>
                  <Route exact strict path="/search_results" component={SearchResults}/>
                  <Route exact strict path="/edit_business/:business_id" component={()=><EditBusiness getAuth={this.getAuth}/>}/>
              </div>
          </Router>
      );

    return (
      <div>
          

          <ToastContainer autoClose={5000}/>

          <Routes/>
       
        

      </div>
    );
  }
}

export default App;
