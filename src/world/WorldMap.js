import React, { Component } from "react";
import PropTypes from "prop-types";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import WorldRegions from "../data/regions";

class WorldMap extends Component {
  render() {
    const {
      worldLink,
      currentRegion,
      mapTitle,
      countries,
      clickedRegions
    } = this.props;
    let width = 200;
    let height = 120;
    let scale = 70;
    let projection = geoNaturalEarth1()
      .translate([width, height])
      .scale(scale);
    const pathGenerator = geoPath().projection(projection);
    const mappedCountries = countries.map((d, i) => {
      let color = "gray";
      if (clickedRegions.indexOf(d.region) !== -1) {
        if (worldLink === "0" || worldLink === "1" ) {
          color = WorldRegions[d.region].colorCode;
        } else {
          color = WorldRegions[d.region].colorCode;
        }
      }      
      let opacity = 1;
      let strokeWidth = 1;
      let strokeOpacity = 0.1;
      if (d.region === currentRegion) strokeOpacity = 0.9;
      return (
        <path
          key={"path" + i}
          d={pathGenerator(d)}
          style={{
            fill: color,
            stroke: "black",
            strokeWidth: strokeWidth,
            strokeOpacity: strokeOpacity,
            opacity: opacity,
            cursor: "pointer"
          }}
          className="countries"
          onMouseOver={() => {
            this.props.UpdateCurrentRegion(d.region - 1);
          }}
          onClick={e => {
            e.preventDefault();
            var newClickedRegions = [];
            var index = clickedRegions.indexOf(d.region);
            if (index === -1) {
              newClickedRegions = clickedRegions.concat(d.region);
            } else {
              clickedRegions.splice(index, 1);
              newClickedRegions = clickedRegions;
            }
            this.props.UpdateClickedRegions(newClickedRegions);
          }}
          onMouseLeave={() => {
            this.props.UpdateCurrentRegion(-1);
          }}
        />
      );
    });
    return (
      <svg
        width={this.props.size[0]}
        height={this.props.size[1]}
        onMouseLeave={() => {
          this.props.UpdateCurrentRegion(-1);
        }}
      >
        {mappedCountries}
        <text x="80" y="15" fontSize="14" fontWeight="bold" font="Roboto">
          {mapTitle}
        </text>
      </svg>
    );
  }
}

WorldMap.propTypes = {
  worldLink: PropTypes.string.isRequired,
  currentRegion: PropTypes.number.isRequired,
  mapTitle: PropTypes.string.isRequired,
  regions: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  UpdateCurrentRegion: PropTypes.func.isRequired,
  clickedRegions: PropTypes.array.isRequired,
  UpdateClickedRegions: PropTypes.func.isRequired,
  size: PropTypes.array.isRequired
};

export default WorldMap;
