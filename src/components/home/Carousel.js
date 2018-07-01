import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption, Container
} from 'reactstrap';
import HomeJumbotron from "../home/Jumbotron";
import NavigationBar from "../home/NavigationBar";
const items = [
	{
			src: './images/business_slide8.jpg',
			altText: 'Slide 1',
			caption: `WeConnect provides a platform that brings businesses and individuals together. This platform
				creates awareness for businesses and gives the users the ability to write reviews about 
				the businesses they have interacted with.`
	},
	{
			src: './images/business_slide9.jpg',
			altText: 'Slide 2',
			caption: `WeConnect provides a platform that brings businesses and individuals together. This platform
			creates awareness for businesses and gives the users the ability to write reviews about 
			the businesses they have interacted with.`
	},
	{
			src: './images/business_slide5.jpg',
			altText: 'Slide 3',
			caption: `WeConnect provides a platform that brings businesses and individuals together. This platform
			creates awareness for businesses and gives the users the ability to write reviews about 
			the businesses they have interacted with.`
	}
];

class HomeCarousel extends Component {
	constructor(props) {
			super(props);
			this.state = { activeIndex: 0,
			isAuthenticated: this.props.getAuth()};
	}

	onExiting = () => {
			this.animating = true;
	}

	onExited = ()=> {
			this.animating = false;
	}

	next =()=> {
			if (this.animating) return;
			const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
			this.setState({ activeIndex: nextIndex });
	}

	previous = ()=> {
			if (this.animating) return;
			const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
			this.setState({ activeIndex: nextIndex });
	}

	goToIndex = (newIndex) => {
			if (this.animating) return;
			this.setState({ activeIndex: newIndex });
	}
	componentWillMount = ()=>{
			if (localStorage.getItem('token') === null){
					this.setState({isAuthenticated: false})
			}
			else( this.setState({isAuthenticated: true}) )
	}

	render() {
		const { activeIndex } = this.state;

		const slides = items.map((item) => {
			return (
				<CarouselItem
						onExiting={this.onExiting}
						onExited={this.onExited}
						key={item.src}>
						<img src={item.src} alt={item.altText} />
						<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
				</CarouselItem>

			);
		});

			return (
				<div style={{backgroundColor: "grey"}}>
						<NavigationBar auth={this.state.isAuthenticated}/>
						<Container>
				
						<HomeJumbotron auth={this.state.isAuthenticated}/>

						<Carousel
								activeIndex={activeIndex}
								next={this.next}
								previous={this.previous}
						>
								<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
								{slides}
								<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
								<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />

						</Carousel>
								</Container>
					</div>

			);
	}
}


export default HomeCarousel;