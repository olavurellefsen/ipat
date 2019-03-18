import React from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import LeftMenu from "./LeftMenu";
import Charts from "./Charts";
import About from "./pages/About";
import Challenges from "./pages/Challenges";
import Settings from "./pages/Settings";
import scenarioCombinations from "./data/scenarioCombinations";
import regions from "./data/regions";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

import Flex from "./components/Flex";
import HamburgerIcon from "./utils/HamburgerIcon";

ReactGA.initialize("UA-112171388-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const MobileHeaderMenu = styled.div`
  display: none;
  ${breakpoint("mobile", "tablet")`
    color: white;
    background: rgb(50, 50, 50);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  `}
`;
// position: fixed;
// top: 0;

const HamburgerWrapper = styled.div`
  padding: 10px;
`;

const MobileHeaderItem = styled.div`
  font-weight: bold;
  font-size: 1.25em;
  padding: 10px;
  margin: 0;
  height: 26px;
  align-items: center;
  color: white;
  text-decoration: none;
`;

const MobileLogo = styled.img`
  width: 30px;
  height: 44px;
  margin: 10px;
  border: 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populationSelection: 2,
      affluenceSelection: 6,
      technologySelection: 0,
      dietSelection: 2,
      worldLink: "12",
      worldChartType: "Primary Energy Consumption",
      worldYear: 2050,
      worldTitle: "Primary Energy Consumption 2050",
      mobileOpen: false,
      currentRegion: -1,
      clickedRegions: [],
      showWelcome: true,
      showMobileMenu: false
    };
    this.scenarioCombinations = scenarioCombinations.scenarioCombinations;
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  UpdateScenarioSelection = (e, name, value) => {
    e.preventDefault();
    this.setState({
      [name]: Number(value)
    });
    this.props.history.push("/");
    this.setState({
      showMobileMenu: false
    });
  };

  UpdateWorldView = (name, value) => {
    this.setState({
      [name]: value
    });
    this.setState({
      worldTitle: this.state.worldChartType + " " + this.state.worldYear
    });
  };

  UpdateCurrentRegion = newCurrentRegion => {
    this.setState({
      currentRegion: newCurrentRegion
    });
  };

  UpdateClickedRegions = newClickedRegionsArray => {
    this.setState({
      clickedRegions: newClickedRegionsArray
    });
  };
  onRegionItemChange = e => {
    var newClickedRegions = [];
    //console.log("ItemChange: " + JSON.stringify(e.target.key));
    if (e === "selectall") {
      regions.forEach(region => {
        newClickedRegions.push(region.id);
      });
    } else if (e === "selectnone") {
    } else {
      var index = this.state.clickedRegions.indexOf(e);
      if (index === -1) {
        newClickedRegions = this.state.clickedRegions.concat(e);
      } else {
        this.state.clickedRegions.splice(index, 1);
        newClickedRegions = this.state.clickedRegions;
      }
    }
    this.UpdateClickedRegions(newClickedRegions);
  };

  render() {
    return (
      <Flex direction="column">
        <MobileHeaderMenu>
          <HamburgerWrapper
            onClick={() => {
              this.setState({ showMobileMenu: !this.state.showMobileMenu });
            }}
          >
            <HamburgerIcon />
          </HamburgerWrapper>
          <MobileHeaderItem to="/">IPAT(D)</MobileHeaderItem>
          <MobileLogo src="./images/dtulogo_white.png" alt="logo" />
        </MobileHeaderMenu>
        <Flex direction="row">
          <LeftMenu
            scenarioSelection={this.state}
            scenarioCombinations={this.scenarioCombinations}
            updateScenarioSelection={this.UpdateScenarioSelection}
            showMobileMenu={this.state.showMobileMenu}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Charts
                scenarioSelection={this.state}
                UpdateCurrentRegion={this.UpdateCurrentRegion}
                UpdateWorldView={this.UpdateWorldView}
                UpdateClickedRegions={this.UpdateClickedRegions}
                closeWelcome={this.UpdateScenarioSelection}
                onRegionItemChange={this.onRegionItemChange}
              />
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/settings" component={Settings} />
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(App);
