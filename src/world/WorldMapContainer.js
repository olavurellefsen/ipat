import React, { Component } from "react";
import PropTypes from "prop-types";
import { geoCentroid } from "d3-geo";
import WorldMap from "./WorldMap";
import worlddata from "../data/world";
import regions from "../data/regions";
//import WorldLegend from "./WorldLegend";
import ChartBox from "../components/ChartBox";

const countries = worlddata.features.filter(d => geoCentroid(d)[0] < 180);

class WorldMapContainer extends Component {
  constructor(props) {
    super(props);
    let width = "400px";
    let height = "200px";
    this.state = {
      width: width,
      height: height,
      hover: "none",
      brushExtent: [0, 179]
    };
  }

  render() {
    let worldLink = this.props.scenarioSelection.worldLink;
    return (
      <ChartBox>
        <WorldMap
          countries={countries}
          regions={regions}
          size={[this.state.width, this.state.height]}
          worldLink={worldLink}
          currentRegion={this.props.scenarioSelection.currentRegion}
          UpdateCurrentRegion={this.props.UpdateCurrentRegion}
          clickedRegions={this.props.scenarioSelection.clickedRegions}
          UpdateClickedRegions={this.props.UpdateClickedRegions}
          mapTitle={this.props.scenarioSelection.worldTitle}
        />
      </ChartBox>
    );
  }
}

WorldMapContainer.propTypes = {
  scenarioSelection: PropTypes.object.isRequired,
  UpdateCurrentRegion: PropTypes.func.isRequired,
  UpdateClickedRegions: PropTypes.func.isRequired
};

export default WorldMapContainer;
