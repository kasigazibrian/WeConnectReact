import React, { Component } from 'react';
import { Col, Container, Row, FormGroup } from "reactstrap"
// import NavigationBar from "./NavigationBar";
import BusinessCatalog from "./BusinessCatalog";
import BusinessProfile from "./BusinessProfile";
import LoginForm from "./Loginform";
import HomeCarousel from "./carousel";
import SearchPage from "./searchpage";
import MyJumbotron from "./Home";
import SignupForm from "./SignupForm";
// import BusinessCatalog from "./BusinessCatalog";
//import LoginForm from "./Loginform";
//import SignupForm from "./SignupForm";
import BusinessRegistration from "./RegisterBusiness";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LogOut from "./Logout";
import ResetPassword from "./ResetPassword";
import EditBusiness from "./EditBusiness";
import DeleteBusiness from './DeleteBusiness'




class App extends React.Component {
constructor(props){
    super(props);
    this.state = {
        is_authenticated: false
    }
}

getAuth = ()=>{
    return this.state.is_authenticated
};

setAuth = ()=>{
    this.setState({is_authenticated: true})
};

unsetAuth = ()=>{
    this.setState({is_authenticated: false})
};


 render(){

      const Routes = () => (
          <Router>
              <div>
                  <Route exact strict path="/register" component={()=> <BusinessRegistration getAuth={this.getAuth()}/>}/>
                  <Route exact strict path="/logout" component={()=><LogOut getAuth={this.getAuth}/>}/>
                  <Route exact strict path='/businesses' component={BusinessCatalog}/>
                  <Route exact strict path='/search' component={()=><SearchPage getAuth={this.getAuth}/>}/>
                  <Route exact strict path="/" component={() => <HomeCarousel getAuth={this.getAuth}/> } />
                  <Route exact strict path="/login" component={() => <LoginForm unsetAuth={this.unsetAuth}
                                                                                setAuth={this.setAuth}
                                                                                getAuth={this.getAuth}/>} />
                  <Route exact strict path="/signup" component={()=> <SignupForm getAuth={this.getAuth}/>} />
                  <Route exact strict path="/reset_password" component={()=>(<ResetPassword getAuth={this.getAuth}/>)}/>
                  <Route strict path="/businesses/:business_id" component={BusinessProfile}/>
                  <Route strict path="/edit_business/:business_id" component={()=><EditBusiness getAuth={this.getAuth}/>}/>
                  <Route strict path="/delete_business/:business_id" component={()=><DeleteBusiness getAuth={this.getAuth}/>}/>
              </div>
          </Router>
      );

    return (
      <div>

          <ToastContainer autoClose={8000}/>

          <Routes/>
          {/*<BusinessRegistration/>*/}

      </div>
    );
  }
}

export default App;
