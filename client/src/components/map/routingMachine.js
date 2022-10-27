// Leaflet
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// CSS
import "./style.css";

const CreateRoutingMachineLayer = (props) => {
  const { coords } = props;

  const control = L.Routing.control({
    waypoints: [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ],
    lineOptions: {
      styles: [{ color: "#FACC15", opacity: 1, weight: 8 }],
    },
    createMarker: function (i: number, waypoint: any, n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        icon: L.icon({
          iconUrl: "./imgs/markers/start-marker.png",
          iconSize: [32, 32],
        }),
      });
      return marker;
    },
    addWaypoints: false,
    autoRoute: true,
  });

  return control;
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;