import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption, Container
} from 'reactstrap';
import MyJumbotron from "./Home";
import NavigationBar from "./NavigationBar";
const items = [
    {
        src: 'business_slide8.jpg',
        altText: 'Slide 1',
        caption: 'WeConnect provides a platform that brings businesses and individuals together. This platform ' +
        'creates awareness for businesses and gives the users the ability to write reviews about ' +
        'the businesses they have interacted with.'
    },
    {
        src: 'business_slide6.jpg',
        altText: 'Slide 2',
        caption: ''
    },
    {
        src: 'business_slide5.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0,
        is_authenticated: this.props.getAuth()};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    componentWillMount(){
        if (localStorage.getItem('token') === null){
            this.setState({is_authenticated: false})
        }
        else( this.setState({is_authenticated: true}) )
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (



                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}

                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />

                </CarouselItem>

            );
        });

        return (
            <div style={{backgroundColor: "grey"}}>
                <NavigationBar auth={this.state.is_authenticated}/>
                <Container>
            {/*<button className="my-button">Get started!</button>*/}
            <MyJumbotron auth={this.state.is_authenticated}/>

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